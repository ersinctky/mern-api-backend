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

// update post

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// Delete post

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ message: "post has been deleted" });
});

module.exports = { createPost, getPost, updatePost, deletePost };
