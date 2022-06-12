const express = require("express");

const router = express.Router();
const { createServiceProvider } = require("../controllers/serviceprovider");

router.post("/createservice", createServiceProvider);

module.exports = router;
