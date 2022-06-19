<<<<<<< HEAD
const express = require('express');
=======
const express = require("express");
>>>>>>> eb7252eab37cdfefc44f23444e463aa46bda151d

const router = express.Router();
const {
  createUser,
  userSignIn,
<<<<<<< HEAD
  uploadProfile,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
=======
  fetch_users,
  getUsers,
} = require("../controllers/user");

>>>>>>> eb7252eab37cdfefc44f23444e463aa46bda151d
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
<<<<<<< HEAD
} = require('../middlewares/validation/user');

const multer = require('multer');
//const {shipmentInfo} = require('../controllers/shipmentInfo');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
//router.get('/shipmentInfo', shipmentInfo);
router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
);
=======
} = require("../middlewares/validation/user");

router.post("/create-user", validateUserSignUp, userVlidation, createUser);
router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
router.get("/user", fetch_users);
router.get("/allusers", getUsers);
>>>>>>> eb7252eab37cdfefc44f23444e463aa46bda151d

module.exports = router;
