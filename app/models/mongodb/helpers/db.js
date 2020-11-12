const MongoClient = require("mongodb").MongoClient;
const config = require("../MongoDB_Config");

let db;

const loadDB = async () => {
  const opt_mongo = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
  };
  if (db) {
    return db;
  }
  try {
    const client = await MongoClient.connect(config.url, opt_mongo);
    db = client.db("report");
  } catch (err) {
    Raven.captureException(err);
  }
  return db;
};

module.exports = loadDB;
