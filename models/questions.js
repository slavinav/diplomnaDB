const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
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
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
