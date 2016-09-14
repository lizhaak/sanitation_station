var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");

// Handles login form POST from index.html
router.post("/",
    passport.authenticate("local", {
      successRedirect: "/user",   // Might need to change this to a different view
      failureRedirect: "/"
    })
  );


// Handle index file separately
// Also catches any other request not explicity matched elsewhere
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

module.exports = router;
