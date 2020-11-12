const mysql = require("mysql");
const MySQL_Config = require("../MySQL_Config");

module.exports = async () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection(MySQL_Config.config_DB_MySQL);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });
