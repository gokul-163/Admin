const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  age: String,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);