var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var encryptLib = require("../modules/encryption");
var connection = require("../modules/connection");
var pg = require("pg");

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    //TODO SQL query
    console.log("called deserializeUser in user_sql.js");
    // console.log("id in user_sql.js: ", id);

    pg.connect(connection, function (err, client) {
        if(err) {
            console.log('connection error: ', err);
            // client.end();
            done(err);
        }

        var user = {};
        // console.log("called deserializeUser - pg");

        client.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
            console.log("query block");
            client.end();


            // Handle Errors
            if(err) {
                console.log("query error ", err);
                // client.end();
                done(err);
            }
            user = result.rows[0];
            // client.end();

            if(!user) {
                // user not found
                console.log("Hey incorrect Credentials!");
                return done(null, false, {message: "Incorrect Credentials!"});
            } else {
                // user found
                // console.log("User row in user_sql file: ", user);
                done(null, user);
                console.log("after done(null, user)");
            }



        });
    });
});


// Does actual work of logging in
passport.use("local", new localStrategy({
    passReqToCallback: true,
    usernameField: "username"
}, function(req, username, password, done) {
    pg.connect(connection, function (err, client) {
        console.log("called local - pg");
        var user = {};
        // assumes the username will be unique, thus returning 1 or 0 results
        var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

        query.on("row", function (row) {
            console.log("User obj", row);
            user = row;

            // Hash and compare
            if(encryptLib.comparePassword(password, user.password)) {
                // all good!
                console.log("passwords match!");
                done(null, user);
            } else {
                console.log("password does not match");
                done(null, false, {message: "Incorrect Credentials!"});
            }
        });

        console.log("whats going on lin 88: ");
        // After all the data is returned, close connection and return results
        query.on("end", function () {
            console.log("hey this end function before: ");
            client.end();
            console.log("hey this end function after: ");
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
        });
    }
));

module.exports = passport;
