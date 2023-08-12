const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const User = require("../models/usermodel");
const Post = require("../models/postmodel");

app.use(cors());

async function getUser(req, res) {
  const id = req.params.id;

  try {
    const findUser = await User.findById(id);

    if (findUser) {
      res.json({
        id,
        username: findUser.username,
        post: findUser.post,
        followers: findUser.followers,
        following: findUser.following,
      });
    } else res.json({ user: "Not found" });
  } catch (error) {
    console.log(error);
  }
}

async function searchUser(req, res) {
  const searchedUser = req.params.query;
  if (searchedUser === "") {
    console.log("Empty");
    return;
  }
  const query = { username: { $regex: searchedUser, $options: "i" } };

  const findDocument = await User.find(query);
  res.json({ documents: findDocument });
}

async function followUser(req, res) {
  const { userid, followerid, followed } = req.headers;
  try {
    switch (followed) {
      case "Followed":
        await User.findByIdAndUpdate(userid, {
          $push: { following: followerid },
        });
        await User.findByIdAndUpdate(followerid, {
          $push: { followers: userid },
        });
        break;
      case "Unfollow":
        await User.findByIdAndUpdate(userid, {
          $pull: { following: followerid },
        });
        await User.findByIdAndUpdate(followerid, {
          $pull: { followers: userid },
        });
        break;
    }
    res.json({ message: "Done" });
  } catch (error) {
    console.log(error);
  }
}

async function getFollowers(req, res) {
  const { userid, followerid } = req.headers;
  let following = false;

  let followingArr = [];
  let followersArr = [];

  try {
    const currentUser = await User.findById(followerid);
    let getFollowing = currentUser.following;
    let getFollowers = currentUser.followers;

    for (const follower of getFollowers) {
      const followerUser = await User.findById(follower);
      followersArr.push(followerUser.username);
    }
    for (const followed of getFollowing) {
      const followedUser = await User.findById(followed);
      followingArr.push(followedUser.username);
    }
    const getUser = await User.findById(userid)
    if (getUser.following.includes(followerid)) following = true;
    else following = false;
  } catch (error) {
    console.log(error);
  }

  return res.json({ following, followingArr, followersArr });
}

module.exports = { searchUser, getUser, followUser, getFollowers };
