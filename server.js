const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {
  async_list_TaiKham
} = require("./app/controllers/auto_import_taikham");
const rate = require("./app/routes/Rate");

start_server = async () => {

  setInterval(async_list_TaiKham, 1200000);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api',rate)

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running on port 3000. \n\n -----------------Console.log()--------------------------`
    );
  });
};

start_server();
