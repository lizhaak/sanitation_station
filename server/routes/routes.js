var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sanitation';

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT DISTINCT route_id FROM locations",
                  function(err, result) {

                    // done();
                    client.end();

                    if (err) {
                      console.log("error: ", err);
                      res.sendStatus(500);
                    }
                    // console.log('result.rows', result.rows);
                    res.send(result.rows);
                  });
  });
});

module.exports = router;
