const db = require("../startup/db");

const { validationResult } = require("express-validator");

// PUT city

exports.updateCity = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed. Entered data are incorrect.",
      errors: errors.array(),
    });
  }

  let sql = `UPDATE cities SET population =? WHERE name = ?`;

  db.query(sql, [req.body.population, req.body.name], function (err, result) {
    if (err) throw err;
    res.json({ message: "City updated" });
  });

  console.log("Hello Jovana");
};

// DELETE city
exports.deleteCity = (req, res) => {
  let sql = `DELETE FROM cities WHERE id = ?`;

  const id = req.params.id;

  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({ message: "City deleted" });
  });
};
