const loadDB = require("../models/mongodb/helpers/db");
const excel = require("exceljs");
var moment = require("moment");
const flag_reexam_booking = require("../models/schema/flag_reexam_booking.model");
const { connect } = require("../models/mongoose/helpers/connection");
exports.get_list_taikham_by_date = async (req, res) => {
  try {
    const db = await loadDB();
    try {
      let fromDate = req.params.fromDate;
      let toDate = req.params.toDate;

      const collection = "List_TaiKham";
      const condition = {
        "Ngay Kham": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      };
      const list_TaiKham = await db
        .collection(collection)
        .find(condition)
        .toArray();

      let tutorials = [];
      for (const v of list_TaiKham) {
        tutorials.push({
          SoHoSo: v["So Ho So"],
          fullname: v["Ho Ten"],
          birthyear: v["Nam Sinh"],
          mobile: v["Dien Thoai"],
          tinh: v["Tinh Thanh"],
          NgayKham: moment(v["Ngay Kham"]).format("YYYY-MM-DD HH:mm:ss"),
        });
      }

      AddRows(tutorials, res);
    } catch (error) {
      console.log("error :>> ", error);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};

AddRows = (tutorials, res) => {
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("DanhSachTaiKham");

  worksheet.columns = [
    { header: "Số hồ sơ", key: "SoHoSo", width: 15 },
    { header: "Họ và tên", key: "fullname", width: 30 },
    { header: "Năm sinh", key: "birthyear", width: 10 },
    { header: "Số điện thoại", key: "mobile", width: 20 },
    { header: "Tỉnh thành", key: "tinh", width: 20 },
    { header: "Ngày khám", key: "NgayKham", width: 25 },
  ];

  // Add Array Rows
  worksheet.addRows(tutorials);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "DanhSachTaiKham.xlsx"
  );

  workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};

exports.flagBooking = async (req, res) => {
  let obj = req.body;
  let patientId = obj.patientId;
  console.log("object :>> ", patientId);

  var x = await CheckTaiKham(patientId);
  console.log("flag :>> ", x);

  if (x) {
    obj.FirstBooking = 1;
    await save_flag_booking(obj);
    res.send({ status:200, message: "flag re-exam booking success" });
  } else {
    res.send({ ms: "flag re-exam booking fails" });
  }
};

save_flag_booking = async (obj) => {
  try {
    await connect();
    try {
      console.log(obj);
      const Newflagbooking = new flag_reexam_booking(obj);

      Newflagbooking.save()
        .then((data) => {
          console.log("oke");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

CheckTaiKham = async (id) => {
  try {
    const db = await loadDB();
    try {
      var x = await db.collection("patient").findOne({ id });
      console.log("x :>> ", x);

      if (x == null) {
        return false;
      }

      var y = await db
        .collection("patient_promo")
        .findOne({ mobile: x.mobile });
      console.log("y :>> ", y);

      return y !== null ? true : false;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
