const mongoose = require("mongoose");

var createDate = Date.now();

const userSchema = mongoose.Schema({
  email: String,
  pass: String,
  link: String,
  nickname: String,
  token: String,
  createDate: { type: Number, default: createDate },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
