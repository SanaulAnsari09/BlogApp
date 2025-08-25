const express = require("express");
const {
  handleAddCommentController,
  handleGetCommentByPostIdController,
} = require("../controller/comment");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/addcomment", checkAuth, handleAddCommentController);
router.get("/getcomments", handleGetCommentByPostIdController);

module.exports = router;
