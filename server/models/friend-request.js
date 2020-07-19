const _ = require("lodash");
const mongoose = require("mongoose");
const friendRequestSchema = new mongoose.Schema({
  sender_id: {
    type: "ObjectId",
    required: true,
  },
  receiver_id: {
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


const FriendRequestModel = mongoose.model("friend-request", friendRequestSchema);

class FriendRequest extends FriendRequestModel {
  constructor() {
    super();
  }

  instance() {
    return FriendRequest;
  }

  async getListByReceiverId(receiverId) {
    return await FriendRequestModel.find({ receiver_id: mongoose.Types.ObjectId(receiverId) });
  }

  getTotalRequest(userId) {
    if (_.isEmpty(userId) === true) {
      return 0;
    }

    return FriendRequestModel.countDocuments({ receiver_id: userId });
  }
}

module.exports = new FriendRequest();