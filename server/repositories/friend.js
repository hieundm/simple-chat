const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
  user_id: {
    type: "String",
    required: true,
  },
  user_friend_id: {
    type: "String",
    required: true,
  },
  created_at: {
    type: "Number",
  },
  is_deleted: {
    type: "Boolean",
  },
  deleted_at: {
    type: "Number",
  },
});

const friendRepository = mongoose.model("friend", friendSchema);

module.exports = friendRepository;
