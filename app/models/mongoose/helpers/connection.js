const mongoose = require("mongoose");
const dbConfig = require("../Mongoose_Config");

const opt_mongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
};

exports.connect = () => {
  try {
     mongoose.connect(dbConfig.url, opt_mongo);
  
  } catch (error) {
       console.log(error);
  }
  const db = mongoose.connection;
  db.once("open", function () {
   // console.log("Connected to MongoDB");
  });
  db.on("error", function (err) {
    console.log(err);
  });
  return db;
};
