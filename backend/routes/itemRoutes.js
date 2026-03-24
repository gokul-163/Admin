const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer = require("multer");

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
    const item = new Item({
        name: req.body.name,
        image: req.file.filename
    });

    await item.save();
    res.json(item);
});

// READ
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
    const payload = { name: req.body.name };
    if (req.file) {
        payload.image = req.file.filename;
    }
    const updated = await Item.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
    );
    res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
});

module.exports = router;