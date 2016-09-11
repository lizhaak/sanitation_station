var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
// var NodeGeocoder = require('node-geocoder');

// Still need to edit these:
// var passport = require("");
// var session = require("express-session");

// Routes includes //
// var index = require("");
// var user = require("");
// var register = require("");
var locations = require("./routes/locations");

// var options = {
//   provider: 'google',
//
//   // Optional depending on the providers
//   httpAdapter: 'https', // Default
//   apiKey: 'AIzaSyDF0hGyxgzZ4gcIPGCd_uRSGZ9UC4P8wXc', // for Mapquest, OpenCage, Google Premier
//   formatter: null         // 'gpx', 'string', ...
// };
//
// var geocoder = NodeGeocoder(options);
//
// // Using callback
// geocoder.geocode('1303 Eagle Bluff Drive Hastings MN 55033', function(err, res) {
//   console.log(res);
// });


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

app.use("/locations", locations);

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

// app.get("/jq", function(req,res,next){
//     res.sendFile(path.join(__dirname, "./public/views/index.html"));
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

// App Set //
app.set("port", (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
