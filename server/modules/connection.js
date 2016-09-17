// connection.js
var connectionString = "";

if(process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + "ssl";
  console.log("connectonString is not undefined: ", connectionString);
} else {
  connectionString = "postgres://localhost:5432/sanitation";
  console.log("connectonString is else statement: ", connectionString);
}

module.exports = connectionString;
