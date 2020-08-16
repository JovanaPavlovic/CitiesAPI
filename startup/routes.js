const express = require("express");

const cities = require("../routes/cities");

const user = require("../routes/users");

const admin = require("../routes/admin");

module.exports = function (app) {
  app.use(express.json());
  app.use(cities);
  app.use(user);
  app.use(admin);
};
