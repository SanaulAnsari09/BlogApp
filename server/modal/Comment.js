const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
