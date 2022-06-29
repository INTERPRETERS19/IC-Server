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

exports.getShipper = async (req, res, next) => {
  try {
    const { id } = req.body.id;
    const shipper = await Shipper.findById(id);
    if (!shipper) {
      console.log(req.body)
      return res.status(400).json({ msg: "There is no shipper" });
      
    }

    return res.status(200).json({
      success: true,
      data: shipper,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
