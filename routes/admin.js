var express = require('express'),
    packagejson = require('../package.json'),
    drivers = require('../drivers/')
    fs = require('fs'),
    router = express.Router();

var header = fs.readFileSync("./inc/header.inc", "utf8", function(err, data) { if (err) throw err; });
var footer = fs.readFileSync("./inc/footer.inc", "utf8", function(err, data) { if (err) throw err; });
var adminmenu = fs.readFileSync("./inc/adminmenu.inc", "utf8", function(err, data) { if (err) throw err; });
var dashboardinc = fs.readFileSync("./inc/dashboard.inc", "utf8", function(err, data) { if (err) throw err; });
var firmwareinc = fs.readFileSync("./inc/firmware.inc", "utf8", function(err, data) { if (err) throw err; });


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
    next()
})


router.get("*", function(req,res) {
    req.page = req.page + footer;
    res.send(req.page);
})
module.exports = router;