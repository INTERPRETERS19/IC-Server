const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  recipient_name: {
    type: String,
    required: true,
  },
  Recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
});
module.exports = mongoose.model("shipment", ShipmentSchema);
