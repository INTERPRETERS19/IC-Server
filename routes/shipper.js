const express = require("express");

const router = express.Router();
const { createShipper, getShipper } = require("../controllers/shipper");

router.post("/createshipper", createShipper);
router.get("/shipperdetails", getShipper);

module.exports = router;
