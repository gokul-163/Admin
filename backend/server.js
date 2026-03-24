const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://127.0.0.1:27017/adminDB")
  .then(() => console.log("MongoDB Connected"));

app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

const loginRoutes = require("./routes/loginRoutes");
app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/auth", loginRoutes);

app.listen(5000, () => console.log("Server running on 5000"));