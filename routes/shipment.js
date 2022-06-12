const express = require("express");

const router = express.Router();
const { createShipment } = require("../controllers/shipment");

router.post("/createsh", createShipment);

module.exports = router;
