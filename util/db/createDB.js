const mysql = require("mysql2");
const citiesJson = require("./cities.json");

module.exports = function () {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "budale@912",
    database: "citiesdb",
  });

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected to mySQL");

    /*  con.query("CREATE DATABASE IF NOT EXISTS citiesdb", (err, res) => {
      if (err) throw err;
      console.log("Database Created");
    });
 */

    con.query(
      "CREATE TABLE IF NOT EXISTS cities (id INT primary key auto_increment, name varchar(255) UNIQUE, description varchar(1000), country varchar(255), population INT, creationDate varchar(255))",
      (err, res) => {
        if (err) throw err;
        console.log("Cities Table Created");
      }
    );

    con.query(
      "CREATE TABLE IF NOT EXISTS users (id INT primary key auto_increment, username varchar(255) UNIQUE, email varchar(255) UNIQUE, password varchar(255))",
      (err, res) => {
        if (err) throw err;
        console.log("Users Table Created");
      }
    );

    con.query(
      "CREATE TABLE IF NOT EXISTS favourite_cities (user_id INT NOT NULL, city_id INT NOT NULL, PRIMARY KEY (city_id, user_id), " +
        "CONSTRAINT fk_city_has_users1 FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE NO ACTION ON UPDATE NO ACTION, " +
        "CONSTRAINT fk_user_has_cities1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION)",
      (err, res) => {
        if (err) throw err;
        console.log("Favourite Table Created");
      }
    );

    return (city = citiesJson.map((item) => {
      const sql = `INSERT INTO cities (name, description, country, population) VALUES ('${item.name}', '${item.description}', '${item.country}', '${item.population}') ON DUPLICATE KEY UPDATE id=id`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Citiy record inserted: ", result);
      });
    }));
  });
};
