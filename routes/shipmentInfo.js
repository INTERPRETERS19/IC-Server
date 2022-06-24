const express = require("express");

const router = express.Router();
const { getShipmentInfo } = require("../controllers/shipmentInfo");
const { updateShipmentStatus } = require("../controllers/shipmentInfo");

router.get("/shipmentinfo", getShipmentInfo);
router.post("/updatestatus", updateShipmentStatus);

module.exports = router;