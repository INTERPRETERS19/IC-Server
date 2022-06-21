const Shipment = require("../models/shipment");
//const Address = require("../models/address");
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
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,
    r_postal_code,
    r_no_street,
    r_district,
    r_city,
    shipper_details,
    driver_assigned,
    pickup_date,
  } = req.body;

  const user = await User.findById(driver_assigned);
  const shipper = await Shipper.findById(shipper_details);

  const shipment = await Shipment({
    id,
    recipient_name,
    mobile_phone_number,
    secondary_phone_number,
    shipment_weight,
    DV,
    description,
    quantity,
    COD,
    prepaid,
    handling,
    payment_method,
    created_at,
    current_status,

    r_postal_code,
    r_no_street,
    r_district,
    r_city,
    shipper_details: shipper,
    driver_assigned: user,
    pickup_date,
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
  const { id } = req.params;

  // const fullname = req.body.fullname;
  try {
    const datas = await Shipment.find({
      driver_assigned: id,
      current_status: "Delivered",
      COD: { $gt: 0 },
    }).select({ id: 1, COD: 1 });

    console.log(datas);
    // const total = await Shipment.find;
    // .select({ id: 1, COD: 1 });
    // .aggregate([{ $group: { _id: id, total: { $sum: "$COD" } } }]);
    let total = 0;
    datas.forEach((data) => (total += data.COD));
    return res.status(200).json({
      success: true,
      count: datas.length,
      data: datas,
      total: total,
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
