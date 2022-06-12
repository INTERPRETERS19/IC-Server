const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.change_password = async (req, res) => {
  try {
    const oldpassword = req.body.oldpassword;
    const id = req.body.loginperson;
    const newPassword = req.body.newPassword;
    console.log(oldpassword);
    console.log(id);
    console.log(newPassword);
    const user = await User.findById(id);
    const password = user.password;
    console.log(password);

    const isMatch = await bcrypt.compare(oldpassword, password);
    console.log(isMatch);
    if (!isMatch) {
      res.status(200).send({
        success: false,
        message: "your old password does not match!",
      });
    } else {
      const hashpassword = bcrypt.hashSync(newPassword, 8);
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          password: hashpassword,
        }
      );
      const userData = await User.findOne({ _id: user._id });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      const userinform = {
        fullname: userData.fullname,
        email: userData.email,
        avatar: userData.avatar ? user.avatar : "",
        id: userData._id,
      };
      res.status(200).send({
        message: "Password successfully changed",
        data: { userinform },
        token: token,
        success: true,
      });
    }
  } catch (error) {
    res.send(error);
  }
};
