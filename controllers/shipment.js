const Shipment = require("../models/shipment");
const Address = require("../models/address");
const User = require("../models/user");
const Shipper = require("../models/shipper");

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

// exports.getStatus = async (req, res, next) => {
//   try {
//     const shipmentStatus = await Shipment.find(current_status);

//     return res.status(200).json({
//       success: true,
//       count: shipmentStatus.length,
//       data: shipmentStatus,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };

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
