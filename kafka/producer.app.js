var express = require("express");
var kafka = require("kafka-node");
var app = express();
const config = require("../config/kafka.config");


var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

var Producer = kafka.Producer,
  client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost }),
  producer = new Producer(client);

producer.on("ready", function () {
  console.log("Producer is ready");
});

producer.on("error", function (err) {
  console.log("Producer is in error state");
  console.log(err);
});

app.get("/", function (req, res) {
  res.json({ greeting: "Kafka Producer" });
});

app.post("/sendMsg", function (req, res) {
  var sentMessage = JSON.stringify(req.body.message);
  payloads = [{ topic: req.body.topic, messages: sentMessage, partition: 0 }];
  producer.send(payloads, function (err, data) {
    res.json(data);
  });
});

app.listen(5000, function () {
  console.log("Producer running at 5000");
});
