const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models/db");
const app = express();
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const rate = require("./app/routes/Rate");
const PORT = process.env.PORT || 81;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

mongoose.Promise = global.Promise;

var opt_mongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
};

start_server = async () => {
  await db.connect();
  await mongoose.connect(dbConfig.url, opt_mongo);

  app.use("/api", rate);

  app.get("/", function (req, res) {
    res.json({ greeting: "Kafka Producer" });
  });

  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}. \n\n -----------------Console.log()--------------------------`
    );
  });
};

start_server();
