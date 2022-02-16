const express = require("express");
const {
  postCategory,
  getCategory,
} = require("../controllers/categoryController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", postCategory);
router.get("/", getCategory);

module.exports = router;
