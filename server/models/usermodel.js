require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
  },
  token: {
    type: String,
  },
  post: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
});
userSchema.index({ username: "text" });
const User = mongoose.model("User", userSchema);

module.exports = User;
