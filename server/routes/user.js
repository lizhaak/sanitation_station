var express = require("express");
var router = express.Router();
var passport = require("passport");

// Handles Ajax request for user information if user is authenticated
router.get("/", function(req, res) {
    // check if logged in
    // console.log('/user req.user in user.js: ', req.user);
    // console.log('-- session --');
    // console.dir(req.session);
    // console.log('-------------');
    // console.log('-- cookies --');
    // console.dir(req.cookies);
    // console.log('-------------');
    // console.log('-- signed cookies --');
    // console.dir(req.signedCookies);
    // console.log('-------------');
    if(req.isAuthenticated()) {
        // send back user object from database
        // console.log('req.user in user.js file: ', req.user);
        res.send(req.user);
    } else {
        // failure best handled on the server. Do redirect here.
        res.send(false);
    }
});

router.get("/logout", function(req, res) {
    console.log("Logged out");
    req.logOut();
    res.sendStatus(200);
});

module.exports = router;
