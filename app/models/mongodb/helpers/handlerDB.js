const db = require("./db");

exports.findBy = (collection, objectParam) => {
  return db.getDB().collection(collection).find(objectParam);
};
