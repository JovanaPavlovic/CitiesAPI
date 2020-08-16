const db = require("../startup/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user/login

exports.logUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  db.query(`SELECT * FROM users WHERE email = ?`, [email], async function (
    err,
    result
  ) {
    if (result.length === 0)
      return res.status(401).send("Email or password are incorect");

    const validPassword = await bcrypt.compare(password, result[0].password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const id = result[0].id;
    const role = result[0].role;
    const token = jwt.sign({ id, role }, "mysecretkey", { expiresIn: "1h" });

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({
        status: 200,
        token,
        message: "User logged in",
      });
  });
};

// user/register

exports.regUser = async (req, res) => {
  const sql = `INSERT INTO users(username, email, password, role) VALUES (?)`;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log(hashPassword);

  let values = [req.body.username, req.body.email, hashPassword, "USER"];

  db.query(sql, [values], function (err, data) {
    if (err) {
      res.json({
        status: 400,
        err,
        message: "Fatal error",
      });
    } else {
      res.json({
        status: 200,
        data,
        message: "New User Added",
      });
    }
  });
};
