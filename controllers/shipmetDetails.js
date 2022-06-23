const Shipment = require("../models/shipment.js");

exports.shipmentDetails = async (req, res, next) => {
  const id = req.body;
  try {
    const shipmentDetails = await Shipment.findById(id);

    if (!shipmentDetails) {
      return res.status(400).json({ msg: "There is no details for shipment" });
    }
    res.json(shipmentDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
