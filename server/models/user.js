const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: {
    type: "String",
  },
  last_name: {
    type: "String",
  },
  email: {
    type: "String",
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
    trim: true,
  },
  salt: {
    type: "String",
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
