const express = require("express");
const { updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

module.exports = router;
