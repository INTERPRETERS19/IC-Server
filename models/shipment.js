const mongoose = require("mongoose");
const Nanoid = require("nanoid");
// const NanoidAsync = require("nanoid/async");

// console.log(`UUID with Nano ID sync: ${Nanoid.nanoid()}`);

// (async function () {
//   const nanoId = await NanoidAsync.nanoid();
//   console.log(`UUID with Nano ID async: ${nanoId}`);
// })();

const ShipmentSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => Nanoid.nanoid(8),
  },
  // @Id private ObjectId id;

  recipient_name: {
    type: String,
    required: true,
  },

  ShipmentWeight: {
    type: Number,
    required: true,
  },

  MobilePhoneNumber: {
    type: String,
    required: true,
  },
  SecondaryPhoneNumber: {
    type: String,
  },

  DV: {
    type: Number,
  },

  PostalCode: {
    type: String,
  },

  Description: {
    type: String,
    required: true,
  },

  Quantity: {
    type: Number,
    required: true,
  },

  COD: {
    type: Number,
    required: true,
  },

  Prepaid: {
    type: Boolean,
    required: true,
  },

  Handling: {
    type: String,
    required: true,
  },

  PaymentMethod: {
    type: String,
    required: true,
  },
  driverID:{
    type:mongoose.Types.ObjectId,
    ref: "user"
  
});
// console.log(`ID : ${Nanoid.nanoid(12)}`);
module.exports = mongoose.model("shipment", ShipmentSchema);
