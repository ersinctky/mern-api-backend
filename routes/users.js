const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "user " });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `${req.params.id} id user` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: `${req.params.id} id user deleted`,
  });
});

module.exports = router;
