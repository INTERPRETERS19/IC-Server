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

  r_postal_code: {
    type: Number,
  },

  r_no_street: {
    type: String,
    required: true,
  },
  r_city: {
    type: String,
    required: true,
  },
  r_district: {
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
  shipper_details: {
    type: mongoose.Types.ObjectId,
    ref: "shipper",
  },

  driver_assigned: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  pickup_date: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("shipment", ShipmentSchema);