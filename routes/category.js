const express = require("express");
const {
  postCategory,
  getCategory,
} = require("../controllers/categoryController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, postCategory);
router.get("/", protect, getCategory);

module.exports = router;
