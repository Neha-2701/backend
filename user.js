const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("users", userSchema);
