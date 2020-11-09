const express = require("express");
const bodyParser = require("body-parser");
const db = require("../app/models/db");
const app = express();
const dbConfig = require("../config/database.config");
const mongoose = require("mongoose");
const rate = require("../app/routes/Rate");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
var opt_mongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
};

start_server = async () => {
  try {
    await db.connect();
    await mongoose.connect(dbConfig.url, opt_mongo);
  } catch (error) {
    console.log("Not connection Database !");
  }
  app.get("/", function (req, res) {
    res.json({ greeting: "Kafka Producer" });
  });
  //app.use("/api", rate);

  app.listen(PORT, () => {
    console.log(
      `Consumer is running on port ${PORT}. \n\n -----------------Console.log()--------------------------`
    );
  });
  const svConsumer = require("./consumer");
  svConsumer.kafkaConsumer();
};
start_server();
