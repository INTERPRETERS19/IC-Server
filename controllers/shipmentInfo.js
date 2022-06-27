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

exports.updateShipmentStatus = async (req, res, next) => {
  try {
    console.log(req.body.selectedValue);
    const shipments = await Shipment.updateOne(
      { id: req.body.shipmentId },
      {
        current_status:req.body.selectedValue,
        reason:req.body.text,
      }
    );
    // const shipments = await Shipment.find({ _id: req.body.id });
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      // message: shipments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};