const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: {
    type: "String",
  },
  last_name: {
    type: "String",
  },
  company_name: {
    type: "String",
  },
  address: {
    type: "String",
  },
  city: {
    type: "String",
  },
  county: {
    type: "String",
  },
  state: {
    type: "String",
  },
  zip: {
    type: "String",
  },
  phone1: {
    type: "String",
  },
  phone2: {
    type: "String",
  },
  web: {
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
  last_online_at: {
    type: "String",
  },
  is_active: {
    type: "Boolean",
  },
});

const userRepository = mongoose.model("users", userSchema);

module.exports = userRepository;
