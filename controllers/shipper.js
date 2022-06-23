const Shipper = require("../models/shipper");
//const Address = require("../models/address");

exports.createShipper = async (req, res) => {
  const {
    username,
    businessname,
    email,
    password,
    mobile_number,
    shipper_address,
  } = req.body;

  const sh_address = await Address.findById(shipper_address);
  const shipper = await Shipper({
    username,
    businessname,
    email,
    password,
    mobile_number,
    shipper_address: sh_address,
  });
  await shipper.save();
  res.json({ success: true, shipper });
};
