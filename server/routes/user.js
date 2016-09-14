var express = require("express");
var router = express.Router();
var passport = require("passport");

// Handles Ajax request for user information if user is authenticated
router.get("/", function(req, res) {
    // check if logged in
    if(req.isAuthenticated()) {
        // send back user object from database
        console.log('req.user in user.js file: ', req.user);
        res.send(req.user);
    } else {
        // failure best handled on the server. Do redirect here.
        res.send(false);
    }
});

module.exports = router;
