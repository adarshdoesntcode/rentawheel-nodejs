const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    kilometersdriven: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    availablestock: {
      type: String,
      required: true,
    },
    seatcapacity: {
      type: String,
      required: true,
    },
    bootcapacity: {
      type: String,
      required: true,
    },
    imgurl: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Vehicles = mongoose.model("Vehicles", vehicleSchema);

module.exports = Vehicles;
