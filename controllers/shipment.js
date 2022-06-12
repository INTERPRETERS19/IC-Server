const Shipment = require("../models/shipment");

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
    // receipientAddress,
    // shipperAddress,
    // serviceProvider,
    // driverAssigned,
  } = req.body;
  //   const isNewUser = await User.isThisEmailInUse(email);
  //   if (!isNewUser)
  //     return res.json({
  //       success: false,
  //       message: "This email is already in use, try sign-in",
  //     });
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
    // receipientAddress,
    // shipperAddress,
    // serviceProvider,
    // driverAssigned,
  });
  await shipment.save();
  res.json({ success: true, Shipment });
};
