const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "register" });
});
const login = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "login" });
});

module.exports = {
  register,
  login,
};
