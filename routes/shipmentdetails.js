const express = require("express");

const router = express.Router();
const { shipmentDetails } = require("../controllers/shipmetDetails");

router.get("/shipmentdetails", shipmentDetails);

module.exports = router;