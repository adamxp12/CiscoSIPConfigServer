var express = require('express'),
    packagejson = require('../package.json'),
    fs = require('fs'),
    router = express.Router();

var header = fs.readFileSync("./inc/header.inc", "utf8", function(err, data) { if (err) throw err; });
var footer = fs.readFileSync("./inc/footer.inc", "utf8", function(err, data) { if (err) throw err; });
var dashboardinc = fs.readFileSync("./inc/dashboard.inc", "utf8", function(err, data) { if (err) throw err; });

router.get('*', function(req, res, next) {
    if(req.session.user){
        req.page = header;
        next();
    } else {
        res.redirect('/');
    }
})

router.get('/', function(req, res, next) {
    req.page = req.page + dashboardinc.replace("{username}", req.session.user)
    next()
})


router.get("*", function(req,res) {
    req.page = req.page + footer;
    res.send(req.page);
})
module.exports = router;