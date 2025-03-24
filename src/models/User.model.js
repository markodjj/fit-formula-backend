const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  picture: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
