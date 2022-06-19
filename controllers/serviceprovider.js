const ServiceProvider = require("../models/serviceprovider");

exports.createServiceProvider = async (req, res) => {
  const { company_name, email, password, mobile_number } = req.body;
  const serviceprovider = await ServiceProvider({
    company_name,
    email,
    password,
    mobile_number,
  });
  await serviceprovider.save();
  res.json({ success: true, serviceprovider });
};
