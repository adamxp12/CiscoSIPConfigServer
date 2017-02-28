// Main - Cisco SIP Config Server
// Code by Adam Blunt 2017
// Created out of rage and major headaches of XML files
// Cisco make good phones but terrible software for them

// Requires
var express = require('express'),
    app = express(),
    clear = require("cli-clear"),
    package = require('./package.json');

// Some varibles
var port = 3000;

app.get('/', function (req, res) {
    res.send(package.name + " v" + package.version)
})


app.listen(port, function () {
    clear()
    console.log(package.name + " v" + package.version)
    console.log("Serving requts on *:"+port)
})