const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

// valid jwt token

exports.authUser = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.jwt_secret_key);
    console.log(decoded);
    req.jwtDecoded = decoded; // { id: 12, iat: 1597354122, exp: 1597357722 } token for user with id=12
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};

// valid jwt token and ADMIN role
exports.authAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.jwt_secret_key);
    console.log(decoded);
    if (decoded.role === "ADMIN") {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized.");
    }
    // { id: 12, iat: 1597354122, exp: 1597357722 } token for user with id=12
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};
