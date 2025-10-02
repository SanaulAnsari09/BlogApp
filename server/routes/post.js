const express = require("express");
const uploadImage = require("../middleware/uploadImage");
const {
  handleAddPostController,
  handleUpdatePostController,
  findAllPostByUserIdController,
  deletePostsByUserController,
  handleAllPostController,
  handleAllCategoryListController,
  handleCategoryWiseFitlerContorller,
  handleSinglePostContorller,
  latestPostController,
  getMostCommentedPostsController,
  getRelatedPOstController
} = require("../controller/post");

const router = express.Router();

router.post("/addpost", uploadImage, handleAddPostController);
router.post("/updatepost", handleUpdatePostController);
router.get("/allpostbyuserid", findAllPostByUserIdController);
router.delete("/deletepostbyuser/:id", deletePostsByUserController);
router.get("/allpost", handleAllPostController);
router.get("/allcategorylist", handleAllCategoryListController);
router.get("/postlistbycategory", handleCategoryWiseFitlerContorller);
router.post("/singlepost", handleSinglePostContorller);
router.get("/latestpost", latestPostController);
router.get("/getpopularpost", getMostCommentedPostsController);
router.get("/gerrelatedpost", getRelatedPOstController);

module.exports = router;
