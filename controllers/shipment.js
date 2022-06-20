const Shipment = require("../models/shipment");
const Address = require("../models/address");
const User = require("../models/user");
const Shipper = require("../models/shipper");
const mongoose = require("mongoose");

exports.createShipment = async (req, res) => {
  const {
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    postal_code,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    receipient_address,
    shipper_address,
    driver_assigned,
  } = req.body;

  const r_address = await Address.findById(receipient_address);
  const user = await User.findById(driver_assigned, ["fullname", "email"]);
  const shipper = await Shipper.findById(shipper_address);
  const s_address = await Address.findById(shipper.shipper_address);

  const shipment = await Shipment({
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    postal_code,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    receipient_address: r_address,
    shipper_address: s_address,
    driver_assigned: user,
  });
  await shipment.save();
  res.json({ success: true, shipment });
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("userAddress", "city");

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllShipments = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    return res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getCollections = async (req, res, next) => {
  const id = req.body;
  try {
    const collections = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      current_status: "Delivered",
      COD: { $gt: 0 },
    }).select({ id: 1, COD: 1 });
    console.log(collections);
    return res.status(200).json({
      success: true,
      count: collections.length,
      data: collections,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getDelivered = async (req, res, next) => {
  const id = req.body;
  try {
    const delivered = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      current_status: "Delivered",
    }).select({ id: 1 });
    console.log(delivered);
    return res.status(200).json({
      success: true,
      count: delivered.length,
      data: delivered,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getOutForDelivery = async (req, res, next) => {
  const id = req.body;
  try {
    const outfordelivery = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      current_status: "OutForDelivery",
    }).select({ id: 1 });
    console.log(outfordelivery);
    return res.status(200).json({
      success: true,
      count: outfordelivery.length,
      data: outfordelivery,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getRescheduled = async (req, res, next) => {
  const id = req.body;
  try {
    const rescheduled = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      current_status: "Rescheduled",
    }).select({ id: 1 });
    console.log(rescheduled);
    return res.status(200).json({
      success: true,
      count: rescheduled.length,
      data: rescheduled,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getSummary = async (req, res, next) => {
  const id = req.body;
  try {
    const summary = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
    }).select({ id: 1 });
    console.log(summary);
    return res.status(200).json({
      success: true,
      count: summary.length,
      data: summary,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getFailToDelivery = async (req, res, next) => {
  const id = req.body;
  try {
    const failtodelivery = await Shipment.find({
      "driver_assigned._id": new mongoose.Types.ObjectId(id.id),
      current_status: "FailToDeliver",
    }).select({ id: 1 });
    console.log(failtodelivery);
    return res.status(200).json({
      success: true,
      count: failtodelivery.length,
      data: failtodelivery,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};