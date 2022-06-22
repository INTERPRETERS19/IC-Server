const mongoose = require("mongoose");

const ShipperSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
    maxLength: [10, "Max Length is 10 characters"],
    minLength: [10, "Min Length is 10 characters"],
  },
  shipper_address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
});
module.exports = mongoose.model("shipper", ShipperSchema);
