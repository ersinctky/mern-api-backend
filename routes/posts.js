const express = require("express");
const { getPost, createPost } = require("../controllers/postsController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.get("/:id", getPost);

module.exports = router;
