const Shipment = require("../models/shipment");
const User = require("../models/user");
const Shipper = require("../models/shipper");

exports.createShipment = async (req, res) => {
  const {
    id,
    recipient_name,
    MobilePhoneNumber,
    SecondaryPhoneNumber,
    ShipmentWeight,
    DV,
    PostalCode,
    Description,
    Quantity,
    COD,
    Prepaid,
    Handling,
    PaymentMethod,
    createdAt,
    currentStatus,
    receipientAddress,
    shipperAddress,
    serviceProvider,
    driverAssigned,
  } = req.body;

  const address = await Address.findById(receipientAddress);
  const provider = await ServiceProvider.findById(serviceProvider);
  const user = await User.findById(driverAssigned);
  const s_address = await Shipper.findById(shipperAddress);

  const shipment = await Shipment({
    id,
    recipient_name,
    MobilePhoneNumber,
    SecondaryPhoneNumber,
    ShipmentWeight,
    DV,
    PostalCode,
    Description,
    Quantity,
    COD,
    Prepaid,
    Handling,
    PaymentMethod,
    createdAt,
    currentStatus,
    receipientAddress: address,
    shipperAddress: s_address,
    serviceProvider: provider,
    driverAssigned: user,
  });
  await shipment.save();
  res.json({ success: true, shipment });
};

exports.getStatus = async (req, res, next) => {
  try {
    const shipmentStatus = await Shipment.find(currentStatus);

    return res.status(200).json({
      success: true,
      count: shipmentStatus.length,
      data: shipmentStatus,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
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
