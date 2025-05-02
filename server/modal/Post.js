const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Tag: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Should be atleast one item",
      },
    },
    Image: {
      type: String,
    },
    Description: {
      type: String,
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
