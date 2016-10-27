// connection.js
var connectionString = "";

if(process.env.DATABASE_URL != undefined) {
  connectionString = {
    user: process.env.PGUSER, //env var: PGUSER
    database: process.env.PGDATABASE, //env var: PGDATABASE
    password: process.env.PGPASSWORD, //env var: PGPASSWORD
    port: 5432, //env var: PGPORT
    max: 1000, // max number of clients in the pool
    host: process.env.PGHOST,
    ssl: true,
    idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
  };
} else {
  connectionString = "postgres://localhost:5432/sanitation";
  connectionString = {
      user: 'elizabethhaakenson', //env var: PGUSER
      database: 'sanitation', //env var: PGDATABASE
      password: '', //env var: PGPASSWORD
      port: 5432, //env var: PGPORT
      max: 1000, // max number of clients in the pool
      idleTimeoutMillis: 1000, // miliseconds (1 second) how long a client is allowed to remain idle before being closed
    };
}

module.exports = connectionString;
