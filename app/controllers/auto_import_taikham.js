const loadDB = require("./../models/mongodb/helpers/db");
const MySql_Connection = require("./../models/mysql/helpers/connection");
const query = require("./../models/mysql/helpers/query");
mysqlQuery = async (t1, t2) => {
  try {
    const conn = await MySql_Connection();
    try {
      const [results] = await query(
        conn,
        `call medprodb.get_ListTaiKham('${t1}','${t2}');`
      );
      return results.length < 1 ? { ms: "loi gi roi" } : results;
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
};

NosqlQuery = async (results) => {
  try {
    const db = await loadDB();
    try {
      await db.collection("List_TaiKham").insertMany(results);
      console.log("done !");
    } catch (error) {
      //   return error;
    }
  } catch (error) {
    //return error;
  }
};

find_fromDate = async (results) => {
  try {
    const db = await loadDB();
    try {
      var x = await db
        .collection("List_TaiKham")
        .find({})
        .sort({
          date_update: -1,
        })
        .limit(1)
        .toArray();

      return x.length < 1 ? "" : x[0].date_update;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.log("connection :>> ", error);
  }
};

exports.async_list_TaiKham = async () => {
  var moment = require("moment");

  console.log(moment(await find_fromDate()).format("YYYY-MM-DD HH:mm:ss"));
  let fromDate =
    (await find_fromDate()) == false
      ? ""
      : moment(await find_fromDate()).format("YYYY-MM-DD HH:mm:ss");
  let toDate = moment().format("YYYY-MM-DD HH:mm:ss");

  const results = await mysqlQuery(fromDate, toDate);
  console.log("1 :>> ", results.length);
  await NosqlQuery(results);
};
exports.demo = async () => {};
