const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street_no: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("address", AddressSchema);
