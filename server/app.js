var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

// Still need to edit these:
// var passport = require("");
var session = require("express-session");

// Routes includes //
// var index = require("");
// var user = require("");
// var register = require("");


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// // Passport Session Configuration //
// app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: { maxage: 60000, secure: false }
// }));

// // start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
// app.use('/register', register);
// app.use('/user', user);
// app.use('/*', index);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

// App Set //
app.set("port", (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
