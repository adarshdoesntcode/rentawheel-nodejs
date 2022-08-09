const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bookingSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    imgurl: {
      type: String,
    },
    clientname:{
      type: String,
      
    },
    payableamt:{
      type:String,
      required:true
    },
    clientcontact:{
      type: String,
      required: true
    },
    clientlicense:{
      type: String,
      required: true
    },
    pickupdate: {
      type: Date,
      required: true,
    },
    dropoffdate: {
      type: Date,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    vehicleid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Clients",
    },
    status:{
      type:String,
      required:true
    }
  },

  {
    timestamps: true,
  }
);

// bookingSchema.pre("save", async function (next) {
//   //using old function format cause arrow function doesnot have access to 'this'
//   const booking = this;

//   if (booking.isModified("otp")) {
//     booking.otp = await bcrypt.hash(booking.otp, 6);
//   }

//   next(); //is strictly needed to continue the program else it will remain stuck here
// });

const Bookings = mongoose.model("Bookings", bookingSchema);

module.exports = Bookings;
