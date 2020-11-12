const db = require("mongoose");

const flag_re_examination_booking = db.Schema(
  {
    FirstBooking : {
        type:Number,
        default: ''
    }, 
    ReturnBooking :  {
        type:Number,
        default: ''
    }, 
    RebookingFromList : {
        type:Number,
        default: ''
    }, 
    patientId : Number, 
    BookingID : String, 
    Platform : String, 
    PatnerId : String, 
    Date : {
        type:Date,
        default: Date.now()
    }
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
