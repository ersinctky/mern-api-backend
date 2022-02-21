const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  imageUpload,
} = require("../controllers/postsController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { profileImageUpload } = require("../middleware/profileImageUpload");

router.post("/", protect, createPost);
router.get("/:id", getPost);
router.get("/", getAllPosts);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post(
  "/upload",
  [protect, profileImageUpload.single("profilePic")],
  imageUpload
);

module.exports = router;
