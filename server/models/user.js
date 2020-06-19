const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name: "string"
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;