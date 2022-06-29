const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  driving_licence_no: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
    maxLength: [10, "Max Length is 10 characters"],
    minLength: [10, "Min Length is 10 characters"],
  },
  vehicle_type: {
    type: String,
    required: true,
  },
  vehicle_reg_No: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;
    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

module.exports = mongoose.model("user", userSchema);
