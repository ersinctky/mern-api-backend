const express = require("express");
const {
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

router.put("/", protect, updateUser);
router.get("/", protect, admin, getUsers);

router.delete("/:id", protect, deleteUser);

module.exports = router;
