const mongoose = require("mongoose");

const flagbooking = mongoose.Schema({
  BookingID: {
    type: String,
    required: true,
    // default: null,
  },
  patientId: {
    type: String,
    required: true,
    //  default: null,
  },
  Platform: {
    type: String,
    required: true,
    //  default: null,
  },
  PatnerId: {
    type: String,
    required: true,
    //default: null,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  FirstBooking: {
    type: Number,
    default: null,
  },
  ReturnBooking: {
    type: Number,
    default: null,
  },
  RebookingFromList: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("flag_Bookings", flagbooking, "flag_Bookings");
