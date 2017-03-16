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
    fileUpload = require('express-fileupload'),
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

var fwSchema = new Schema({
    phonemodel : { type: String, required: true, maxlength: 5},
    loadfile : { type: String, required: true}
})
var ciscosipconfigfw = mongoose.model('ciscosipconfigfw', fwSchema);

var phoneSchema = new Schema({
    name : {type: String, required: true, maxlength: 20},
    model : { type: String, required: true, maxlength: 4},
    phonelabel : { type: String, maxlength: 20},
    servicesurl : String,
    line1label : { type: String, required: true, maxlength: 20},
    sipserverip: { type: String, required: true},
    extension : { type: Number, required: true},
    password : { type: String, required: true, maxlength: 8},
    mac : { type: String, required: true, maxlength: 14},
    loadfile : { type: String, required: true}
})
var ciscosipconfigphone = mongoose.model('ciscosipconfigphone', phoneSchema);

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
app.use(fileUpload({
	limits: { fileSize: 20 * 1024 * 1024 },
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

// Check if its a first run
app.get('/', function(req,res, next) {
    ciscosipconfiguser.count({}, function( err, count){
		if(count > 0) {
			next();
		} else {
			res.send(req.page+firstrun.replace("{ver}", package.version)+footer)
        }
    })
})

// Setup login page for none logged in users and redirect logged in users
app.get('/', function (req, res, next) {
    loginpage=loginpage.replace("{ver}", package.version)
    req.page = req.page+loginpage
    if(session.user) {
        res.redirect('/admin')
    } else {
        next()
    }
})

// Signup route
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

// Include admin router
var adminroute = require('./routes/admin');
app.use('/admin', adminroute);

// Simple logout route
app.get('/logout', function(req,res) {
    session.user = null;
    res.redirect('/')
})

// Login route
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
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    session.user = username;
                    res.redirect('/')
                } else {
                    res.redirect('/');
                }
            }
        })
    }
})

// Test drivers page
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
    console.log("Serving requests on *:"+config.webport)
})