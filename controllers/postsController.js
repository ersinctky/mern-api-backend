const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

//CREATE POST
const createPost = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const post = await Post.create({
    title: req.body.title,
    desc: req.body.desc,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// Get post
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.find({ user: req.user.id });
  if (!post) {
    req.statusCode(400);
    throw new Error("There is no post");
  } else {
    res.status(200).json(post);
  }
});

module.exports = { createPost, getPost };
