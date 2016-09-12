var express = require("express");
var router = express.Router();
var pg = require('pg');
var NodeGeocoder = require('node-geocoder');
var connectionString = 'postgres://localhost:5432/sanitation';


var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDF0hGyxgzZ4gcIPGCd_uRSGZ9UC4P8wXc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// // Using callback
// geocoder.geocode('1303 Eagle Bluff Drive Hastings MN 55033', function(err, res) {
//   console.log(res);
// });


router.post('/', function(req, res, next) {
  var address = req.body
  console.log('address req.body: ', address);
  // console.log('')
  address.latitude = 0;
  address.longitude = 0;

  geocoder.geocode(address.location, function(err, res) {
    address.latitude = res[0].latitude
    address.longitude = res[0].longitude
    console.log('before 2nd post',res);
      next();
    });
});

router.post('/', function(req, res) {
  console.log('req.body: ', req.body);
  var address = req.body;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("INSERT INTO locations (account_id,address,city,state,zip,icon,latitude,longitude,status,route_id)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
          [address.account_id,address.address,address.city,address.state,address.zip,address.icon,address.latitude,address.longitude,address.status,address.route_id],
          function(err, result) {
            done();

            if(err) {
              console.log("query error: ", err);
              res.sendStatus(500);
            }
            // created!
            res.sendStatus(201);
        });
      });
});


router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
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
