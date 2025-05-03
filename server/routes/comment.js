const express = require("express");
const { handleAddCommentController } = require("../controller/comment");

const router = express.Router();

router.post("/addcomment", handleAddCommentController);

module.exports = router