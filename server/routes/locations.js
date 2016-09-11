var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sanitation';

// var NodeGeocoder = require('node-geocoder');
//
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

console.log('this works!');

router.get('/', function(req, res) {
  console.log('Does this work?');
  pg.connect(connectionString, function(err, client, done) {
    console.log('why does this not work?');
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM locations",
                  function(err, result) {

                    done();

                    if (err) {
                      console.log("error: ", err);
                      res.sendStatus(500);
                    }
                    console.log('result.rows', result.rows);
                    res.send(result.rows);
                  });
  });
});

module.exports = router;
