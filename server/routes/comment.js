const express = require("express");
const {
  handleAddCommentController,
  handleGetCommentByPostIdController,
} = require("../controller/comment");

const router = express.Router();

router.post("/addcomment", handleAddCommentController);
router.get("/getcomments", handleGetCommentByPostIdController);

module.exports = router;
