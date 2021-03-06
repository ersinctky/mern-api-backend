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
  // const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.id).populate("user", "name");
  if (!post) {
    req.statusCode(400);
    throw new Error("There is no post");
  }
  res.status(200).json(post);
});

// Get All Posts

const getAllPosts = asyncHandler(async (req, res) => {
  const user = req.query.user;
  const catName = req.query.cat;

  let posts;
  if (user) {
    posts = await Post.find({ user: req.query.user });
    console.log(posts);
  } else if (catName) {
    posts = await Post.find({
      categories: {
        $in: [catName],
      },
    });
  } else {
    posts = await Post.find();
  }
  res.status(200).json(posts);
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

const imageUpload = asyncHandler(async (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const post = await Post.create({
    title: req.body.title,
    desc: req.body.desc,
    user: req.user.id,
    // photo: req.savedImage2,
    photo: req.body.name,
  });

  res.status(200).json(post);
});

// const user = await User.findByIdAndUpdate(
//   req.user.id,
//   {
//     profilePic: req.savedProfileImage,
//   },
//   {
//     new: true,
//     runValidators: true,
//   }
// );
// res.status(200).json({
//   message: "image upload successfull",
//   user,
// });

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  imageUpload,
};
