const db = require("../startup/db");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

// GET all

exports.getCities = (req, res) => {
  let sql = "SELECT * FROM cities";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json({
      status: 200,
      result,
      message: "Cities list retrieved successfully",
    });
  });
};

//GET city by name

exports.getCity = (req, res) => {
  const name = req.params.name;
  let sql = `SELECT * FROM cities WHERE name=?`;
  db.query(sql, [name], function (err, result) {
    if (err) throw err;
    res.json({ message: "City retrived", result });
  });
};

//POST city

exports.postCity = (req, res) => {
  let sql = `INSERT INTO cities(name, description, country, population, creationDAte) VALUES (?) ON DUPLICATE KEY UPDATE id=id`;

  values = [
    req.body.name,
    req.body.description,
    req.body.country,
    req.body.population,
    (req.body.createdAt = new Date()),
  ];

  db.query(sql, [values], function (err, data) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New city added successfully",
      data,
    });
  });
};

exports.addFavourite = (req, res) => {
  let sql = `INSERT INTO favourite_cities (user_id, city_id) VALUES (?, ?)`;

  const city_id = req.params.id;
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.jwt_secret_key);
  const user_id = decoded.id;

  console.log("city id: ", city_id);
  console.log("user id: ", user_id);

  db.query(sql, [user_id, city_id], function (err, data) {
    if (err) throw err;
    res.json({
      status: 200,
      message:
        "New Favourite city successfully added for user with id=" + user_id,
      data,
    });
  });
};
