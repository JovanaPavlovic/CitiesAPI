const mysql = require("mysql2");
const config = require("../config/config.json");

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to mySQL");
});

module.exports = connection;
