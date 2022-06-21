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
  const { id } = req.params;

  // const fullname = req.body.fullname;
  try {
    const dataD = await Shipment.find({
      driver_assigned: id,
      current_status: "Delivered",
    }).select({ id: 1 });

    console.log(dataD);
    // const total = await Shipment.find;
    // .select({ id: 1, COD: 1 });
    // .aggregate([{ $group: { _id: id, total: { $sum: "$COD" } } }]);
    return res.status(200).json({
      success: true,
      count: dataD.length,
      data: dataD,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getOutForDelivery = async (req, res, next) => {
  const { id } = req.params;
  // const fullname = req.body.fullname;
  try {
    const dataO = await Shipment.find({
      driver_assigned: id,
      current_status: "OutForDelivery",
    }).select({ id: 1 ,r_no_street:1 ,r_city:1});

    console.log(dataO);
    return res.status(200).json({
      success: true,
      count: dataO.length,
      data: dataO,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getRescheduled = async (req, res, next) => {
  const { id } = req.params;

  // const fullname = req.body.fullname;
  try {
    const dataR = await Shipment.find({
      driver_assigned: id,
      current_status: "Rescheduled",
    }).select({ id: 1});

    console.log(dataR);
    // const total = await Shipment.find;
    // .select({ id: 1, COD: 1 });
    // .aggregate([{ $group: { _id: id, total: { $sum: "$COD" } } }]);
    return res.status(200).json({
      success: true,
      count: dataR.length,
      data: dataR,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getSummary = async (req, res, next) => {
  const { id } = req.params;

  // const fullname = req.body.fullname;
  try {
    const dataM = await Shipment.find({
      driver_assigned: id,
      // current_status: "Delivered",
    }).select({ id: 1, current_status:1});

    console.log(dataM);
  
    return res.status(200).json({
      success: true,
      count: dataM.length,
      data: dataM,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getFailToDelivery = async (req, res, next) => {
  const { id } = req.params;

  // const fullname = req.body.fullname;
  try {
    const dataF = await Shipment.find({
      driver_assigned: id,
      current_status: "FailToDeliver",
    }).select({ id: 1 });

    console.log(dataF);
    // const total = await Shipment.find;
    // .select({ id: 1, COD: 1 });
    // .aggregate([{ $group: { _id: id, total: { $sum: "$COD" } } }]);
    return res.status(200).json({
      success: true,
      count: dataF.length,
      data: dataF,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
