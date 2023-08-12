const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateSignUp = [
  check("username").notEmpty().withMessage("Username cannot be empty! "),
  check("email").notEmpty().withMessage("Email caannot be empty"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password of length 6 required"),
];

const validateSignIn = [
  check("email").notEmpty().withMessage("Fill in the email!"),
  check("password").notEmpty().withMessage("Fill in the password"),
];

const validatePost = [
  check("title").notEmpty().withMessage("Title cannot be empty"),
  check("description").notEmpty().withMessage("Description cannot be empty")
]

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: errors.array()[0].msg });
  next();
};
module.exports = {
  validateSignIn,
  validateSignUp,
  isRequestValidated,
  validatePost
};
