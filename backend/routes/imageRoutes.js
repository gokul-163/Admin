const express = require("express");
const router = express.Router();
const Image = require("../models/image");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    image: req.file ? req.file.filename : "",
  });
  await newImage.save();
  res.json(newImage);
});

// GET
router.get("/", async (req, res) => {
  const data = await Image.find();
  res.json(data);
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  const payload = { name: req.body.name };
  if (req.file) {
    payload.image = req.file.filename;
  }
  const updated = await Image.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Image.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;