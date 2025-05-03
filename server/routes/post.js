const express = require("express");
const {
  handleAddPostController,
  handleUpdatePostController,
  findAllPostByUserIdController,
  deletePostsByUserController,
  handleAllPostController,
  handleAllCategoryListController,
  handleCategoryWiseFitlerContorller,
  handleSinglePostContorller,
  latestPostController
} = require("../controller/post");

const router = express.Router();

router.post("/addpost", handleAddPostController);
router.post("/updatepost", handleUpdatePostController);
router.get("/allpostbyuserid", findAllPostByUserIdController);
router.post("/deletepostbyuser", deletePostsByUserController);
router.get("/allpost", handleAllPostController);
router.get("/allcategorylist", handleAllCategoryListController);
router.get("/postlistbycategory", handleCategoryWiseFitlerContorller);
router.post("/singlepost", handleSinglePostContorller);
router.get("/latestpost", latestPostController)

module.exports = router;
