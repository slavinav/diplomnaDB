const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  Number: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  ans0: {
    type: String,
    required: true,
  },
  ans1: {
    type: String,
    required: true,
  },
  ans2: {
    type: String,
    required: true,
  },
  ans3: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  descPic: {
    type: String,
  },
});

module.exports = mongoose.model("Question", questionSchema);
