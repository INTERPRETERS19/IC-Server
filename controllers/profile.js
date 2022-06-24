const Profile = require("../models/user");

exports.profile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne(req.body);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};