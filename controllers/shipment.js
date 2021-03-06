const Shipment = require("../models/shipment");
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
  // const date = new Date().substring(0, 10);
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    const start = new Date(2020 - 04 - 01);
    start.setHours(0, 0, 0, 0);
    const end = new Date(2021 - 04 - 01);
    end.setHours(23, 59, 59, 999);
    const datas = await Shipment.find({
      driver_assigned: id,
      current_status: "Delivered",
      delivered_date: {
        $gte: startOfToday,
      },
      COD: { $gt: 0 },
    }).select({ id: 1, COD: 1 });
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
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    const start = new Date(2020 - 04 - 01);
    start.setHours(0, 0, 0, 0);
    const end = new Date(2021 - 04 - 01);
    end.setHours(23, 59, 59, 999);
    const dataD = await Shipment.find({
      driver_assigned: id,
      current_status: "Delivered",
      delivered_date: {
        $gte: startOfToday,
      },
    });

    // console.log(dataD);
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
  try {
    const dataO = await Shipment.find({
      driver_assigned: id,
      current_status: "OutForDelivery",
    });

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
exports.getPickUp = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dataO = await Shipment.find({
      driver_assigned: id,
      current_status: "PickUp",
    }).populate("shipper_details");

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
  try {
    const dataR = await Shipment.find({
      driver_assigned: id,
      current_status: "Rescheduled",
    });

    console.log(dataR);

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

  try {
    const dataM = await Shipment.find({
      driver_assigned: id,
    });

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
    });

    console.log(dataF);
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
exports.getDeliveryfee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const datas = await Shipment.find({
      driver_assigned: id,
      current_status: "PickedUp",
    }).select({ id: 1, delivery_fee: 1 });
    let total = 0;
    datas.forEach((data) => (total += data.delivery_fee));
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
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    const start = new Date(2020 - 04 - 01);
    start.setHours(0, 0, 0, 0);
    const end = new Date(2021 - 04 - 01);
    end.setHours(23, 59, 59, 999);
    const dataD = await Shipment.find({
      driver_assigned: id,
      current_status: "Delivered",
      delivered_date: {
        $gte: startOfToday,
      },
    });
    // console.log(dataD);
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

exports.getPickUp = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dataO = await Shipment.find({
      driver_assigned: id,
      current_status: "PickUp",
    }).populate("shipper_details");
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
