var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");

// module with bcrypt functions
var encryptLib = require("../modules/encryption");
var connection = require("../modules/connection");
var pg = require("pg");

// Handles request for HTML file
router.get("/", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/views/register.html"));
});

// Handles POST request with new user data
router.post("/", function(req,res, next) {

  var saveUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    employee_id: req.body.employee_id,
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    user_type: "employee"
  };
  console.log("new user: ", saveUser);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO users (first_name, last_name, employee_id, username, password, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [saveUser.first_name, saveUser.last_name, saveUser.employee_id, saveUser.username, saveUser.password, saveUser.user_type],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect("/");
          }
        });
  });
});

module.exports = router;
