const express = require("express");
const {
  handleAddPostController,
  handleUpdatePostController,
  findAllPostByUserIdController,
  deletePostsByUserController,
  handleAllPostController,
  handleAllCategoryListController,
  handleCategoryWiseFitlerContorller
} = require("../controller/post");

const router = express.Router();

router.post("/addpost", handleAddPostController);
router.post("/updatepost", handleUpdatePostController);
router.get("/allpostbyuserid", findAllPostByUserIdController);
router.post("/deletepostbyuser", deletePostsByUserController);
router.get("/allpost", handleAllPostController);
router.get("/allcategorylist", handleAllCategoryListController);
router.get("/postlistbycategory", handleCategoryWiseFitlerContorller);

module.exports = router;