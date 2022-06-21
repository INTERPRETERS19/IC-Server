const Shipment = require("../models/shipment.js");

exports.getShipmentInfo = async (req, res, next) => {
  // const email = Profile.email;
  // const value = req.body;
  // console.log(value);
  try {
    const shipmentInfo = await Shipment.findOne(req.body);
  
    if (!shipmentInfo) {
      return res.status(400).json({ msg: "There is no details for shipment" });
    }
    res.json(shipmentInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};