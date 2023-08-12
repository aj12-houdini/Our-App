require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const router = express.Router();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
const {
  validateSignIn,
  validateSignUp,
  isRequestValidated,
  validatePost,
} = require("../validators/auth");
const { signup, signIn } = require("./auth");
const { createPost, getPosts, deletePosts, getFollowingPosts } = require("./posts");
const { searchUser, getUser, followUser, getFollowers } = require("./user");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

router.route("/auth/signup").post(validateSignUp, isRequestValidated, signup);
router.route("/auth/login").post(validateSignIn, isRequestValidated, signIn);
router.route("/post").post(validatePost, isRequestValidated, createPost);
router.route("/get/posts").get(getPosts);
router.route("/delete/posts").delete(deletePosts);
router.route("/search/user/:query").get(searchUser);
router.route("/get/users/:id").get(getUser);
router.route("/follow").patch(followUser);
router.route("/get/follower").get(getFollowers)
router.route("/get/following/posts").get(getFollowingPosts)
module.exports = router;
