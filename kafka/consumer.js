const kafka = require("kafka-node");
const config = require("../config/kafka.config");
const callRate = require("../app/controllers/callRate.controller");
const db = require("../app/models/db");

exports.kafkaConsumer = (req, res) => {

  try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({
      kafkaHost: config.kafkaHost,
    });

    let consumer = new Consumer(client, [{ topic: config.kafka_topic }], {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: "utf8",
      fromOffset: false,
    });
    console.log(consumer);
    consumer.on("message", async function (message) {
      handledata = JSON.parse(message.value);
      console.log(handledata);
      handleMessage(handledata, res);
    });
    consumer.on("error", function (error) {
      console.log("error", error);
    });
  } catch (error) {
    console.log(error);
  }
};

let handleMessage = async (msg, res) => {
  var result = {};
  console.log(msg);
  for (const key in msg) {
    switch (key) {
      case "patientId":
        console.log(msg[key]);
        if ((await callRate.CheckTaiKham(msg[key])).status == false) {
          result = { status: 0, message: "lỗi PatnerId id" };
        }
        msg.FirstBooking = 1;
        break;

      default:
        break;
    }
  }

  if (result.status == 0) {
    console.log("lỗi : " + result.message);
 //   await res.send({ message: result.message });
  } else {
    console.log("msg :>> ", msg);
 //   await res.send({ message: msg });
    callRate.flagForBooking2(msg);
  }
};
