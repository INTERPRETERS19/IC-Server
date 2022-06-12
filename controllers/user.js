const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const {
    fullname,
    email,
    password,
    driving_licence_no,
    mobile_number,
    vehicle_type,
    vehicle_reg_No,
  } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  const user = await User({
    fullname,
    email,
    password,
    driving_licence_no,
    mobile_number,
    vehicle_type,
    vehicle_reg_No,
  });
  await user.save();
  res.json({ success: true, user });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const id = await user._id;

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
    id: user._id,
  };

  res.json({ success: true, user: userInfo, token });
};

exports.fetch_users = async (req, res) => {
  try {
    const { email } = req.body;
    const usersget = await User.findOne({ email });
    res.status(200).json(usersget);
  } catch (error) {
    return res.json({
      success: false,
      message: "Email is not valid",
    });
  }
};

