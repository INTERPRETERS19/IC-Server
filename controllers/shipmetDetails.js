const Shipment = require("../models/shipment.js");

exports.shipmentDetails = async (req, res, next) => {
  // const email = Profile.email;
  const value = req.body;
   console.log(value);
  try {
    const shipmentDetails = await Shipment.findOne(req.id);
  
    if (!shipmentDetails) {
      return res.status(400).json({ msg: "There is no details for shipment" });
    }
    res.json(shipmentDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
