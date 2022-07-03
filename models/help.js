const mongoose = require("mongoose");

const HelpSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

module.exports = mongoose.model("help", HelpSchema);
