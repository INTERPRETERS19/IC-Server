const express = require("express");
const { createAddress } = require("../controllers/address");
const router = express.Router();

router.post("/address", createAddress);

module.exports = router;
