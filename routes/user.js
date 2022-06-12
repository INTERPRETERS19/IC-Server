const express = require("express");

const router = express.Router();
const {
  createUser,
  userSignIn,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");


router.post("/create-user", validateUserSignUp, userVlidation, createUser);
router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
module.exports = router;
