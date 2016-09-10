var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sanitation_station';
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDF0hGyxgzZ4gcIPGCd_uRSGZ9UC4P8wXc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('1303 Eagle Bluff Drive Hastings MN 55033', function(err, res) {
  console.log(res);
});

module.exports = router;
