const db = require("./../models/handlerDB");
const DB = require("./../models/db");
const moment = require("moment");
const excel = require("exceljs");

const flagbooking = require("../models/flagforbooking.model");
const { collection } = require("../models/flagforbooking.model");

AddRows = (tutorials, res) => {
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("DanhSachTaiKham");

  worksheet.columns = [
    { header: "Số hồ sơ", key: "SoHoSo", width: 15 },
    { header: "Mã đơn vị", key: "MaDonVi", width: 15 },
    { header: "patient_promoId", key: "promoId", width: 20 },
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

exports.getlisttaikham = async (req, res) => {
  var fromDate = req.params.fromDate;
  var toDate = req.params.toDate;
  var aggreg = [
    {
      $match: {
        NgayKham: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $lookup: {
        from: "patient",
        localField: "SoHoSo",
        foreignField: "bvdhyd_msbn",
        as: "patient_promo",
      },
    },
    {
      $unwind: "$patient_promo",
    },
    {
      $lookup: {
        from: "dm_city",
        localField: "patient_promo.city_id",
        foreignField: "id",
        as: "dm_city",
      },
    },
  ];

  var list_TaiKham = await DB.getDB()
    .collection("bvdhyd_taikham")
    .aggregate(aggreg)
    .toArray();

  let tutorials = [];
  for (const v of list_TaiKham) {
    tutorials.push({
      SoHoSo: v.SoHoSo,
      MaDonVi: v.MaDonVi,
      promoId: v.patient_promo.id,
      fullname: v.patient_promo.surname + " " + v.patient_promo.name,
      birthyear: v.patient_promo.birthyear,
      mobile: v.patient_promo.mobile,
      tinh: v.dm_city[0].name,
      NgayKham: moment(v.NgayKham).format("YYYY-MM-DD HH:mm:ss"),
    });
  }

  AddRows(tutorials, res);
};

exports.NewBookingByPartnerID = async (req, res) => {
  var x = req.params.fromDate;
  var y = req.params.toDate;

  (collection = "booking"),
    (objparam = {
      date_create: {
        $gte: new Date(x),
        $lte: new Date(y),
      },
    }),
    (x = await db.findBY(collection, objparam).toArray());

  res.send({ message: x });
};

exports.TinhTiLe = async (req, res) => {
  var x = (req.params.fromDate = "2019-08-23T11:24:48.000+0000");
  var y = (req.params.toDate = "2020-05-06T21:59:14.000+0000");

  var array = [
    {
      collection: "patient",
      objparam: {
        date_create: {
          $gte: new Date(x),
          $lte: new Date(y),
        },
      },
    },
    {
      collection: "booking",
      objparam: {
        date_create: {
          $gte: new Date(x),
          $lte: new Date(y),
        },
      },
    },
    {
      collection: "payment",
      objparam: {
        date_create: {
          $gte: new Date(x),
          $lte: new Date(y),
        },
      },
    },
  ];

  let c = [];
  for (const value of array) {
    x = await db.findBY(value.collection, value.objparam).count();
    c.push(x);
  }

  let count = c.length;
  values = c.reduce((previous, current) => (current += previous));
  values /= count * 100;

  res.send({ data: Math.round(values * 100) / 100 + " %" });
};

exports.flagForBooking = (req, res) => {
  const _flagbooking = new flagbooking(req.body);

  _flagbooking
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res

        .status(500)

        .send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the Note.",
        });
    });
};

exports.flagForBooking2 = (obj) => {
  console.log(obj);
  const Newflagbooking = new flagbooking(obj);
  try {
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
};

exports.CheckTaiKham = async (id) => {
  rs = {};
  //console.log("id", id);
  var collection = "patient";
  var obj = {
    id,
  };
  var x = await db.findBY(collection, obj).toArray();

  if (x.length < 1) {
    return { status: false };
  }

  var collection = "patient_promo";
  var obj = {
    mobile: x[0].mobile,
  };

  var y = await db.findBY(collection, obj).count();

  if (y < 1) {
    console.log("No mobile in patient_promo");
    return { status: false };
  }
  return { status: true };
};
