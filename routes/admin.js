var express = require('express'),
    mongoose = require('mongoose'),
    ciscosipconfigfw = require('mongoose').model('ciscosipconfigfw'),
    packagejson = require('../package.json'),
    appRoot = require('app-root-path'),
    drivers = require('../drivers/')
    fs = require('fs'),
    unzipper = require('unzipper'),
    del = require('delete'),
    router = express.Router();

var header = fs.readFileSync("./inc/header.inc", "utf8", function(err, data) { if (err) throw err; });
var footer = fs.readFileSync("./inc/footer.inc", "utf8", function(err, data) { if (err) throw err; });
var adminmenu = fs.readFileSync("./inc/adminmenu.inc", "utf8", function(err, data) { if (err) throw err; });
var dashboardinc = fs.readFileSync("./inc/dashboard.inc", "utf8", function(err, data) { if (err) throw err; });
var firmwareinc = fs.readFileSync("./inc/firmware.inc", "utf8", function(err, data) { if (err) throw err; });
var firmwarenewinc = fs.readFileSync("./inc/firmwarenew.inc", "utf8", function(err, data) { if (err) throw err; });


router.get('*', function(req, res, next) {
    if(req.session.user){
        req.page = header+adminmenu.replace("{username}", req.session.user);
        next();
    } else {
        res.redirect('/');
    }
})

// Main dashboard
router.get('/', function(req, res, next) {
    req.page = req.page + dashboardinc
    req.page = req.page.replace("{drivercount}", Object.keys(drivers).length)
    next()
})

// Firmware dashboard
router.get('/firmware', function(req, res, next) {
    req.page = req.page + firmwareinc
    fwlist = ""
    ciscosipconfigfw.find({}, function(err, fwdb) {
        fwdb.forEach(function(fw) {
            fwlist = fwlist + "<li>Cisco "+fw.phonemodel+" - "+fw.loadfile+" | <a href=\"/admin/firmware/remove/"+fw._id+"\">Remove</a></li>"
        })
    }).then(function() {
        req.page = req.page.replace("{firmwarelist}", fwlist);
        next()
    })    
})

router.get('/firmware/remove/:id', function(req,res) {
    ciscosipconfigfw.findByIdAndRemove(req.params.id, function(err, fwdb) {
        res.redirect("/admin/firmware/")
    })
})

router.get('/firmware/new', function (req, res, next) {
    req.page = req.page + firmwarenewinc
    next()
})

router.post('/firmware/new', function (req, res) {
    zipfile = req.files.file;
    zipfiledata = zipfile.data;
    var tempPath = appRoot + '/zips/' + req.files.file.name;
    var newPath = appRoot + '/tftpboot/';
    zipfile.mv(tempPath, function (err) {
        if (err) {}

        var newfw = new ciscosipconfigfw({
            phonemodel: req.body.model,
            loadfile: req.body.loadfile,
        })
        newfw.save(function (err, newfw) {
            if (err) return console.error(err);
        });

        fs.createReadStream(tempPath)
        .pipe(unzipper.Extract({ path: newPath }))
        .on('close', function (close) {
            del.sync([tempPath]);
            res.redirect('/admin/firmware')
        })
        
    })
})


router.get("*", function(req,res) {
    req.page = req.page + footer;
    res.send(req.page);
})
module.exports = router;