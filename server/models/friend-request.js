const mongoose = require("mongoose");
const friendRequestSchema = new mongoose.Schema({
  from_user_id: {
    type: "ObjectId",
    required: true,
  },
  to_user_id: {
    type: "ObjectId",
    required: true,
  },
  created_at: {
    type: "Number",
    default: Date.now,
  },
  is_success: {
    type: "Boolean",
    default: false,
  },
  is_deleted: {
    type: "Boolean",
    default: false,
  },
  updated_at: {
    type: "Number",
    default: 0,
  },
});

const friendRequest = mongoose.model("friend-request", friendRequestSchema);

module.exports = friendRequest;
