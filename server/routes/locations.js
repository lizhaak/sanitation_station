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

router.put('/', function(req, res) {
  console.log('req.body: ', req.body);
  var address = req.body;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("UPDATE locations SET icon = $1, status = $2 WHERE account_id = $3",
          [address.icon,address.status,address.account_id],
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


router.get('/:id', function(req, res) {
  console.log('params: ', req.params.id);
  var route_id = req.params.id;
  console.log('route_id in get req: ', route_id);
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM locations WHERE route_id = $1",
                  [route_id],
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
