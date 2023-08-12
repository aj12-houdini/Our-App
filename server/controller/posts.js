const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const User = require("../models/usermodel");
const Post = require("../models/postmodel");

app.use(cors());

function formatPost(findPost) {
  return {
    id: findPost._id,
    title: findPost.title,
    description: findPost.description,
    date: findPost.date,
    user: findPost.user,
  };
}

async function createPost(req, res) {
  const { id, username, title, description } = req.body;

  if (!username) {
    res.json({ message: "Sign in" });
    return;
  }
  try {
    const post = await Post.create({
      title,
      description,
      date: new Date(),
      user: username,
    });
    post.save().then((p) => {
      User.findOneAndUpdate({ _id: id }, { $push: { post: p._id } }).then(
        (result) => {
          res.json({ created: true, post_id: p._id });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}
async function getPosts(req, res) {
  const userId = req.headers.id;
  if (!userId) {
    console.log("Invalid username");
    return;
  }
  let postIds = [];
  let getPosts = [];
  try {
    const findUser = await User.findById(userId);
    postIds = findUser.post;
    if (!findUser) return res.json({ message: "Error Could not find user!" });
    for (let post of postIds) {
      const findPost = await Post.findById(post);
      let tempPost = formatPost(findPost);
      getPosts.push(tempPost);
    }
  } catch (error) {
    console.log(error);
  }

  return res.json({ posts: getPosts });
}

async function deletePosts(req, res) {
  const userId = req.headers.userid;
  const postId = req.headers.postid;

  const findUser = await User.findById(userId);
  const findPost = await Post.findById(postId);

  if (findPost) {
    const deletedPost = await Post.deleteOne({ _id: postId });
    console.log(`Deleted post:  ${deletedPost.deletedCount}`);
  }
  let posts = [];
  if (findUser) {
    posts = findUser.post;
    posts.splice(posts.indexOf(postId), 1);
    await User.updateOne({ _id: userId }, { $set: { post: posts } });
  } else console.log("No user found");

  res.json({ message: "Deleted" });
}

async function getFollowingPosts(req, res) {
  const userid = req.headers.userid;
  let followedPostsArr = [];
  try {
    const findUser = await User.findById(userid);
    if (findUser) {
      const followingArr = findUser.following;
      for (let followed of followingArr) {
        const getFollowedUser = await User.findById(followed);

        const getFollowedUserPosts = getFollowedUser.post;
        for (let postId of getFollowedUserPosts) {
          const getPost = await Post.findById(postId);
          let tempPost = formatPost(getPost);
          followedPostsArr.push(tempPost);
        }
      }
    } else console.log("Notfound");
  } catch (error) {
    console.log(error);
  }
  res.json({ followedPostsArr });
}

module.exports = { createPost, getPosts, deletePosts, getFollowingPosts };
