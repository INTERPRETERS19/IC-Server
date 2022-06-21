const express = require("express");

const router = express.Router();
const { getShipmentInfo } = require("../controllers/shipmentInfo");

router.get("/shipmentinfo", getShipmentInfo);

module.exports = router;