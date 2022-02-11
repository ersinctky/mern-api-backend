const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user` });
});
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user deleted` });
});
module.exports = { getUser, updateUser, deleteUser };
