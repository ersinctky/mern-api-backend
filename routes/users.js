const express = require("express");
const {
  updateUser,
  deleteUser,
  getUsers,
  deleteUserByAdmin,
  updateUserByAdmin,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

router.put("/", protect, updateUser);

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.delete("/:id", protect, admin, deleteUserByAdmin);

router.delete("/:id", protect, deleteUser);
router.put("/:id", protect, admin, updateUserByAdmin);

module.exports = router;
