const express = require("express");

const router = express.Router();
const {
  createUser,
  userSignIn,
  getData,
  fetch_users,
} = require("../controllers/user");

const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");

router.post("/create-user", validateUserSignUp, userVlidation, createUser);
router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
// router.get("/userdata", getData);
router.get("/user", fetch_users);
module.exports = router;
