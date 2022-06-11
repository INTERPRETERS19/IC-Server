const Address = require("../models/address");

exports.createAddress = async (req, res) => {
  const { street_no, city, district, province } = req.body;
  const address = await Address({
    street_no,
    city,
    district,
    province,
  });
  await address.save();
  res.json({ success: true, address });
};
