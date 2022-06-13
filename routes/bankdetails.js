const express = require("express");
const { createBank } = require("../controllers/bankdetails");
const router = express.Router();

router.post("/bank", createBank);

module.exports = router;
