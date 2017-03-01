// Main - Cisco SIP Config Server
// Code by Adam Blunt 2017
// Created out of rage and major headaches of XML files
// Cisco make good phones but terrible software for them

// Requires
var express = require('express'),
    app = express(),
    clear = require("cli-clear"),
    package = require('./package.json'),
    xss = require('xss'),
    shortid = require('shortid'),
    helmet = require('helmet');

// Some varibles
var port = 3000;

// Express setup
app.use(express.static('public'));
app.use(helmet({
  hidePoweredBy: false
}));

// Init finished time to do some routes

app.get('/', function (req, res) {
    res.send(package.name + " v" + package.version)
})


// Routes over so lets start the server
app.listen(port, function () {
    clear()
    console.log(package.name + " v" + package.version)
    console.log("Serving requts on *:"+port)
})