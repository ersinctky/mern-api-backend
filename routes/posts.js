const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
} = require("../controllers/postsController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/:id", protect, getPost);
router.put("/:id", protect, updatePost);

module.exports = router;
