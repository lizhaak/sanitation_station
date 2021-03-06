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


router.post('/', function(req, res, next) {
  var address = req.body
  console.log('address req.body line 22 in locations.js: ', address);
  console.log('address req.body line 22 in locations.js: ', address.location.location);

  address.latitude = 0;
  address.longitude = 0;

  geocoder.geocode(address.location.location, function(err, res) {
    address.latitude = res[0].latitude
    address.longitude = res[0].longitude

    console.log('before 2nd post',res);
    console.log("address.latitude line 48: ", address.latitude);
    console.log("address.longitude line 49: ", address.longitude);

    next();
  });
});

router.post('/', function(req, res) {
  console.log('address req.body line 41: ', req.body);
  console.log('address req.body.location line 41: ', req.body.location);
  var address = req.body;
  var internalAddress = req.body.location;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("INSERT INTO locations (account_id,address,city,state,zip,icon,latitude,longitude,status,route_id,trash_status,trashDisplayStatus)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
          [internalAddress.account_id,internalAddress.address,internalAddress.city,internalAddress.state,internalAddress.zip,internalAddress.icon,address.latitude,address.longitude,internalAddress.status,internalAddress.route_id,internalAddress.trash_status,internalAddress.trashDisplayStatus],
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

// Update the balloon icon and status of the client (active, warning, cancel)
router.put('/', function(req, res) {
  console.log('req.body: ', req.body);
  var address = req.body;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("UPDATE locations SET icon = $1, status = $2 WHERE account_id = $3",
          [address.icon, address.status, address.account_id],
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

// Update the balloon icon, trash status, and trash display status client from employee (collected, notCollected, overflowing)
router.put('/trashstatus', function(req, res) {
  console.log('req.body: ', req.body);
  var address = req.body;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("UPDATE locations SET icon = $1, trash_status = $2, trashdisplaystatus = $3 WHERE account_id = $4",
          [address.icon, address.trash_status, address.trashDisplayStatus, address.account_id],
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

// creates the trash log for the trash each day, with a time stamp
router.post('/trashlog', function(req, res) {
  console.log('req.body line 113 in locations.js: ', req.body);
  console.log("req.body.routeID: ", req.body.routeID);
  var route_id = req.body.routeID;
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        }
        client.query("INSERT INTO trashlog (account_id, trash_status) SELECT account_id, trash_status FROM locations WHERE route_id = $1",
          [route_id],
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
  console.log('route_id in get req 142: ', route_id);
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
