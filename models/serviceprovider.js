const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema({
  company_name: {
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
});
module.exports = mongoose.model("serviceprovider", ServiceProviderSchema);
