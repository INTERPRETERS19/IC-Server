const Shipper = require("../models/shipper");

exports.createShipper = async (req, res) => {
  const { username, businessname, email, password, mobile_number } = req.body;
  const shipper = await Shipper({
    username,
    businessname,
    email,
    password,
    mobile_number,
  });
  await shipper.save();
  res.json({ success: true, shipper });
};
