const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
  account_no: {
    type: String,
    required: true,
    unique: true,
  },
  account_holder_name: {
    type: String,
    required: true,
  },
  branch_code: {
    type: String,
    required: true,
  },
  branch_name: {
    type: String,
    required: true,
  },
  bank_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("bankdetails", BankSchema);