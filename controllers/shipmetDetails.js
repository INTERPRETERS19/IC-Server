const ShipmentDetails = require("../models/shipment");

exports.sd = async (req, res, next) => {
  try {
    const sd = await ShipmentDetails.findOne(req.body).populate(
      "shipper_address",
      "city"
    );

    if (!sd) {
      return res.status(400).json({ msg: "There is no shipmentdetails" });
    }
    res.json(sd);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
