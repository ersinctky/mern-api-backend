const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(401).json("You can update only your account!");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user deleted` });
});
module.exports = { updateUser, deleteUser };
