const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

//register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
});

//login
const login = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login" });
});

// me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "me" });
});

module.exports = {
  register,
  login,
  getMe,
};
