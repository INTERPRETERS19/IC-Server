const express = require("express");

const router = express.Router();
const { createShipment, getAllShipments } = require("../controllers/shipment");

router.post("/createsh", createShipment);
router.get("/allshipment", getAllShipments);

module.exports = router;
