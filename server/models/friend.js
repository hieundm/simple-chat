const _ = require("lodash"),
      mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
  user_id: {
    type: "ObjectId",
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

const FriendModel = mongoose.model("friends", friendSchema);

class Friend extends FriendModel {
  constructor() {
    super();
  }

  instance() {
    return Friend;
  }

  async getListByUserId(userId) {
    return await Friend.find({ user_id: mongoose.Types.ObjectId(userId) });
  }

}

module.exports = new Friend();
