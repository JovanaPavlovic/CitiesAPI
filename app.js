const express = require("express");

const bodyParser = require("body-parser");

const app = express();

// require("./util/db/createDB")();

app.use(bodyParser.urlencoded({ extended: true }));

require("./startup/resHeaders")(app);

require("./startup/routes")(app);

require("./startup/db");

//node server

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("Server runs on Port: ", PORT));
