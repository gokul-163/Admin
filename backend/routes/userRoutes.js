const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// GET
router.get("/", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;