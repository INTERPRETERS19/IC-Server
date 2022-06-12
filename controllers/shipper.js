const Shipper = require("../models/shipper");

exports.createShipper = async (req, res) => {
  const {
    username,
    businessname,
    email,
    password,
    mobile_number,
    street_no,
    city,
    district,
    province,
  } = req.body;
  const shipper = await Shipper({
    username,
    businessname,
    email,
    password,
    mobile_number,
    street_no,
    city,
    district,
    province,
  });
  await shipper.save();
  res.json({ success: true, shipper });
};
