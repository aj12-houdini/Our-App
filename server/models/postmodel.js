require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  user: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
