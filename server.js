// Main - Cisco SIP Config Server
// Code by Adam Blunt 2017
// Created out of rage and major headaches of XML files
// Cisco make good phones but terrible software for them

// Clear console and display a loading message, simply because im coding on a slow network share
// and sometimes question if I hit enter on my run command
var clear = require("cli-clear");
clear();
console.log("LOADING!!");

// Requires
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    package = require('./package.json'),
    xss = require('xss'),
    fs = require('fs'),
    shortid = require('shortid'),
    helmet = require('helmet'),
    config = require('./config'),
    drivers = require('./drivers/');

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ciscosipconfig');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username : { type: String, required: true, maxlength: 20},
    password : { type: String, required: true},
    isAdmin : { type: Boolean, required: true, default: false }
})
var ciscosipconfiguser = mongoose.model('ciscosipconfigUser', UserSchema);

// Express setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet({
  hidePoweredBy: false
}));
app.use(session({
  secret: config.secret,
  cookie: {},
  saveUninitialized: false,
  resave: false
}));

var header = fs.readFileSync("./inc/header.inc", "utf8", function(err, data) { if (err) throw err; });
var footer = fs.readFileSync("./inc/footer.inc", "utf8", function(err, data) { if (err) throw err; });
var loginpage = fs.readFileSync("./inc/login.inc", "utf8", function(err, data) { if (err) throw err; });
var firstrun = fs.readFileSync("./inc/firstrun.inc", "utf8", function(err, data) { if (err) throw err; });



// Init finished time to do some routes

// Add header
app.get('/*', function(req, res, next) {
    session=req.session;
    req.page = header;
    next()
})

// routes go here

app.get('/', function(req,res, next) {
    ciscosipconfiguser.count({}, function( err, count){
		if(count > 0) {
			next();
		} else {
			res.send(req.page+firstrun.replace("{ver}", package.version)+footer)
        }
    })
})


app.get('/', function (req, res, next) {
    loginpage=loginpage.replace("{ver}", package.version)
    req.page = req.page+loginpage
    if(session.user) {
        res.redirect('/admin')
    }
    next()
})

app.post('/signup', function(req, res) {
    ciscosipconfiguser.count({}, function( err, count){
		if(count > 0) {
			res.redirect('/');
		} else {
			var newuser = new ciscosipconfiguser({
                username : xss(req.body.username),
                password : bcrypt.hashSync(req.body.password),
                isAdmin : true
            })
            newuser.save(function(err, newuser) {
  			if (err) return console.error(err);
            });
            res.redirect('/');
        }
    })
})

var adminroute = require('./routes/admin');
app.use('/admin', adminroute);

app.get('/logout', function(req,res) {
    session.user = null;
    res.redirect('/')
})

app.post('/login', function(req,res) {
    session=req.session;
    username = xss(req.body.username);
    if(session.user) {
        res.redirect('/')
    } else {
        ciscosipconfiguser.findOne({ username: username }, function(error, user) {
            if (error) return console.error(error);
            if(user === null) {
    		    // Username not in database
    		    console.log("Not in database");
    		    res.redirect('/');
            } else {
                console.log(user.password + " " + user.username)
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    session.user = username;
                    console.log("GOOD!")
                    res.redirect('/')
                } else {
                    res.redirect('/');
                }
            }
        })
    }
})


app.get('/drivers', function(req, res, next) {
    var test = "";
    for(driver in drivers) {
        test = test + drivers[driver].name + "<br>";
    }
    req.page = req.page+test;
    next()
    
});


// Add footer
app.get('/*', function(req,res) {
    req.page = req.page+footer;
    res.send(req.page)
})

// Routes over so lets start the server
app.listen(config.webport, function () {
    clear()
    console.log(package.name + " v" + package.version)
    console.log("Serving requts on *:"+config.webport)
})