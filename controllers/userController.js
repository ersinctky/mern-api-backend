const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/Post");
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
  if (req.body.userId === req.params.id) {
    const user = await User.findById(req.params.id);

    await Post.deleteMany({ user: user._id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${req.params.id} id user deleted` });
  } else {
    res.status(401).json("You can delete only your account!");
  }
});
module.exports = { updateUser, deleteUser };
