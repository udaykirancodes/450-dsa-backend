const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
// Imports
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const config = require("../config/config");
const { sendEmail, sendVerificationEmail } = require("../utils/mail");

// Register a User
const handleRegisterUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const { email, password, name } = req.body;
    // try to find a user with `email`
    const user = await User.findOne({ email: email });
    // if user found return error
    if (user) {
      return res.status(400).json(new ApiError(400, [], "Email already taken"));
    }
    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new USER
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isEmailVerified: false,
      token: uuid(),
    });

    const savedUser = await newUser.save();

    // Send a Email to Validate the Email
    return sendVerificationEmail(
      res,
      savedUser.name,
      savedUser.email,
      savedUser.token
    );
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};
// Login a User
const handleLoginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // if user not found
      return res.status(400).json(new ApiError(400, [], "User Not Found"));
    }
    // if found :: check password
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json(new ApiError(400, [], "Invalid Credentials"));
    }

    // JWT TOKEN
    let data = {
      userId: user._id,
    };
    let authToken = await jwt.sign(data, config.JWT);
    res.status(200).json(new ApiResponse(200, { authToken }, "Success"));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
// Verify Email
module.exports = {
  handleRegisterUser,
  handleLoginUser,
};
