const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const JWT_SECRET = "zxcvbnm";


const FIXED_USER = {
  id: "1",
  username: "gokul",
  password: "123456",
};


router.post("/login", (req, res) => {
  const { username, password } = req.body;


  if (username !== FIXED_USER.username) {
    return res.status(400).json({ message: "Invalid username" });
  }

  
  if (password !== FIXED_USER.password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: FIXED_USER.id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: FIXED_USER.id,
      username: FIXED_USER.username,
    },
  });
});

module.exports = router;