var router = require("express").Router();

const callRate = require("../controllers/callRate.controller");

router.get("/getListReExamByDate/:fromDate/:toDate", callRate.getlisttaikham);
//router.get("/getListReExamByDate", callRate.demo);
router.get("/getRate", callRate.TinhTiLe);
router.get(
  "/newBookingByDate/:fromDate/:toDate",
  callRate.NewBookingByPartnerID
);

router.post("/flagForBooking", callRate.flagForBooking);
const svConsumer = require("../../kafka/consumer");

router.get("/consum", svConsumer.kafkaConsumer);

module.exports = router;
