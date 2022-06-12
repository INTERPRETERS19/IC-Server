const express = require("express");

const router = express.Router();
const { change_password } = require("../controllers/changePasswordController");
router.post("/changepassword", change_password);

module.exports = router;
