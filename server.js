const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {
  async_list_TaiKham
} = require("./app/controllers/auto_import_taikham");
const rate = require("./app/routes/Rate");

start_server = async () => {

  setInterval(async_list_TaiKham, 12000);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api',rate)
  app.get('/',(req,res)=>{
    res.send({ms:"wellcome to TaiKham"})
  })

  const PORT = process.env.PORT || 80 ;
  app.listen(PORT, () => {
    console.log(
      `Server is running on port http://localhost:${PORT}. \n\n -----------------Console.log()--------------------------`
    );
  });
};

start_server();
