const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Imports
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const config = require("../config/config");
const {
  sendVerificationEmail,
  sendPasswordRestEmail,
} = require("../utils/mail");
const User = require("../models/user.model");

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
    let authToken = await jwt.sign(data, config.JWT, { expiresIn: "7d" });
    res.status(200).json(new ApiResponse(200, { authToken }, "Success"));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
// Verify Email
const handleVerifyEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const token = req.params.token;
    const user = await User.findOneAndUpdate(
      { token },
      { isEmailVerified: true },
      { new: true }
    );
    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, [], "User Not found with token"));
    }
    return res.status(200).json(new ApiResponse(200, user, "success"));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
// Get User Details
const handleGetUserDetails = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(new ApiError(400, [], "Invalid ID"));
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, [], "User Not found with id"));
    }
    return res.status(200).json(new ApiResponse(200, user, "success"));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
// Request for Password Reset
const handleRequestForPasswordReset = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, [], "User Not found with Email"));
    }
    return sendPasswordRestEmail(res, user.name, user.email, user.token);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
// Edit Password
const handleChangePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError(400, errors.array(), "Error in Fields"));
    }
    const { token, password, changePassword } = req.body;
    if (password !== changePassword) {
      return res.status(400).json(new ApiError(400, [], "Password Mismatch"));
    }
    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // change the password
    const user = await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, [], "User Not found with Token"));
    }
    return res.status(200).json(new ApiResponse(200, user, "Password Updated"));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(new ApiError(400, [], "Internal Server Error : " + error.message));
  }
};
module.exports = {
  handleRegisterUser,
  handleLoginUser,
  handleVerifyEmail,
  handleGetUserDetails,
  handleRequestForPasswordReset,
  handleChangePassword,
};
