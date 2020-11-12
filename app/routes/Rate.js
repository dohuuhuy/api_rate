const { get_list_taikham_by_date, flagBooking, demo1 } = require("../controllers/staticTaiKham.controller");

var Route = require("express").Router();

Route.get("/get_list_taikham_by_date/:fromDate/:toDate", get_list_taikham_by_date);

Route.post('/flag_reexam_booking', flagBooking)

module.exports = Route;

// http://103.125.170.22:10167/api/get_list_taikham_by_date/2020-1-1/2020-11-8
// http://103.125.170.22:10167/api/flag_reexam_booking