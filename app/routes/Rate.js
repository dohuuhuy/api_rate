var router = require("express").Router();

const callRate = require("../controllers/callRate.controller");

router.get("/getListReExamByDate/:fromDate/:toDate", callRate.getlisttaikham);
//router.get("/getListReExamByDate", callRate.demo);
router.get("/getRate", callRate.TinhTiLe);
router.get(
  "/newBookingByDate/:fromDate/:toDate",
  callRate.NewBookingByPartnerID
);


module.exports = router;
