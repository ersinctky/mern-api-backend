const asyncHandler = require("express-async-handler");
const User = require("../models/User");

//register
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({ message: "register" });
});

//login
const login = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login" });
});

module.exports = {
  register,
  login,
};
