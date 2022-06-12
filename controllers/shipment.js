const Shipment = require("../models/shipment");
//const sharp = require("sharp");
//const cloudinary = require("../helper/imageUpload");
//const user = require("../models/user");

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
  });
  await shipment.save();
  res.json({ success: true, shipment });
};
