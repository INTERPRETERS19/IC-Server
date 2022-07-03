const Profile = require("../models/user");
const { cloudinary } = require("../cloudinary");

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

exports.uploadImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "interpreters",
    });
    console.log(uploadResponse.url);

    const imgUrl = uploadResponse.url;
    const userProfile = await Profile.updateOne(
      { _id: id },
      {
        photo: imgUrl,
      }
    );

    const user = await Profile.findById({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
}