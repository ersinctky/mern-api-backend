const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/postsController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
