// Main - Cisco SIP Config Server
// Code by Adam Blunt 2017
// Created out of rage and major headaches of XML files
// Cisco make good phones but terrible software for them

// Requires
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    clear = require("cli-clear"),
    package = require('./package.json'),
    xss = require('xss'),
    fs = require('fs'),
    shortid = require('shortid'),
    helmet = require('helmet'),
    config = require('./config'),
    drivers = require('./drivers/');
clear();
console.log("LOADING!!");
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



// Init finished time to do some routes

// Add header
app.get('/*', function(req, res, next) {
    session=req.session;
    req.page = header;
    next()
})

// routes go here


app.get('/', function (req, res, next) {
    loginpage=loginpage.replace("{ver}", package.version)
    req.page = req.page+loginpage
    if(session.user) {
        req.page = req.page.replace("{user}", session.user)
    }
    next()
})

var adminroute = require('./routes/admin');
app.use('/admin', adminroute);

app.get('/logout', function(req,res) {
    session.user = null;
    res.redirect('/')
})

app.post('/login', function(req,res) {
    session=req.session;
    if(session.user) {
        res.redirect('/')
    } else {
        if(req.body.username === "adamxp12" && req.body.password === "test") {
            session.user = "adamxp12";
            res.redirect('/admin')
        } else {
            res.redirect('/')
        }  
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