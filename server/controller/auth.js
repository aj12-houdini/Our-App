require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");


const Post = require("../models/postmodel");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

async function signup(req, res) {
  console.log(req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide more information" });

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  const findUser = await User.findOne({ email: email });
  if (findUser)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered",
    });
  else {
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    user.save();
    res.json({ message: "added" });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing details" });

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    const matchedPasswords = await bcrypt.compare(password, findUser.password);

    if (matchedPasswords) {
      const token = jwt.sign({ _id: findUser._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      findUser.token = token;
      res.json({ id: findUser._id, username: findUser.username, token: token });
    }
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "user does not exists" });
  }
}



module.exports = { signup, signIn };
