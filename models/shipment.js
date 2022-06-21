const mongoose = require("mongoose");
const Nanoid = require("nanoid");

const ShipmentSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => Nanoid.nanoid(8),
  },
  recipient_name: {
    type: String,
    required: true,
  },

  shipment_weight: {
    type: Number,
    required: true,
  },

  mobile_phone_number: {
    type: String,
    required: true,
  },
  secondary_phone_number: {
    type: String,
  },

  DV: {
    type: Number,
  },

  postal_code: {
    type: Number,
  },

  description: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  COD: {
    type: Number,
    required: true,
    default: 0,
  },

  prepaid: {
    type: Boolean,
    required: true,
  },

  handling: {
    type: String,
    required: true,
  },

  payment_method: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  current_status: {
    type: String,
    default: "New",
  },
  receipient_address: {
    type: Object,
  },
  shipper_address: {
    type: Object,
  },
  driver_assigned: {
    type: Object,
  },
});

module.exports = mongoose.model("shipment", ShipmentSchema);
