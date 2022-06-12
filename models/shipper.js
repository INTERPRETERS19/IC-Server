const mongoose = require("mongoose");

const ShipperSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  businessname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  shipperAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  //photo
});
module.exports = mongoose.model("shipper", ShipperSchema);
// "street_no":"23",
// "city":"moratuwa",
// "district":"colombo",
// "province":"uva"
