const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  image: String,
});

module.exports = mongoose.model("Image", imageSchema);