const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user.model");

const isUser = async (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res.status(400).json(new ApiError(400, [], "Invalid AuthToken"));
  }
  try {
    let data = jwt.verify(token, config.JWT);
    const user = await User.findById(data.userid);
    if (!user) {
      return res.status(400).json(new ApiError(400, [], "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error : " + error.message));
  }
};

module.exports = { isUser };
