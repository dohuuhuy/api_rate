const { get_list_taikham_by_date, flagBooking, demo1 } = require("../controllers/staticTaiKham.controller");

var Route = require("express").Router();

Route.get("/get_list_taikham_by_date/:fromDate/:toDate", get_list_taikham_by_date);

Route.post('/flag_booking', flagBooking)

module.exports = Route;
