const express = require("express");

const router = express.Router();
const { createShipper } = require("../controllers/shipper");

router.post("/createshipper", createShipper);

module.exports = router;
