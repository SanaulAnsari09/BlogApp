const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    Comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;