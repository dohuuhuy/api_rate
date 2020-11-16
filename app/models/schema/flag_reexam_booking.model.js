const db = require("mongoose");

const flag_re_examination_booking = db.Schema(
  {
    FirstBooking: {
      type: Number,
      default: "",
    },
    ReturnBooking: {
      type: Number,
      default: "",
    },
    reBookingFromList: {
      type: Number,
      default: "",
    },
    bookingID: String,
    platform: String,
    patnerId: String,
    booking_date: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model(
  "flag_re_examination_booking",
  flag_re_examination_booking,
  "flag_re_examination_booking"
);
