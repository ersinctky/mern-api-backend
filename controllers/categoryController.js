const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

const postCategory = asyncHandler(async (req, res) => {
  const newCat = new Category(req.body);

  if (!newCat) {
    res.status(400);
    throw new Error("Category not found");
  }

  const savedCat = await newCat.save();
  res.status(200).json(savedCat);
});

const getCategory = asyncHandler(async (req, res) => {
  const cats = await Category.find();
  if (!cats) {
    res.status(400);
    throw new Error("Category not found");
  }

  res.status(200).json(cats);
});
module.exports = { postCategory, getCategory };
