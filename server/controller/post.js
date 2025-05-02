const Post = require("../modal/Post");

const handleAddPostController = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    if (!body?.Title || !body?.Category || !body?.Tag || !body?.Description) {
      return res
        .status(400)
        .json({ Message: "All field's are required", Success: false });
    }

    const addPost = await Post.insertOne({
      ...body,
      UserId: user._id?.toString(),
    });

    if (addPost) {
      return res.status(201).json({
        Message: "Post created successfully !",
        Success: true,
        PostId: addPost._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleUpdatePostController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body?.Title ||
      !body?.Tag ||
      !body?.Category ||
      !body?.Description ||
      !body?.UserId
    ) {
      return res
        .status(400)
        .json({ Message: "All field's are required", Success: false });
    }

    const updatePost = await Post.updateOne({ _id: body?._id }, { $set: body });

    if (updatePost?.acknowledged && updatePost?.modifiedCount > 0) {
      return res
        .status(200)
        .json({ Message: "Post updated successfully !", Success: true });
    }

    return res
      .status(200)
      .json({ Message: "Post updating failed!", Success: false });
  } catch (error) {
    return res.status(500).json({ Messae: error?.message, Success: false });
  }
};

const findAllPostByUserIdController = async (req, res) => {
  try {
    const users = req.user;

    const allPosts = await Post.find({ UserId: users._id?.toString() });

    return res.status(200).json({
      Message: "Fetched all post by user id",
      Total: allPosts.length,
      Success: true,
      AllPosts: allPosts,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const deletePostsByUserController = async (req, res) => {
  try {
    const postId = req.body._id;

    const findPost = await Post.findOne({ _id: postId });

    if (!findPost) {
      return res
        .status(200)
        .json({ Message: "Post doesn't exist", Success: false });
    }

    const deleted = await Post.deleteOne({ _id: postId });

    if (deleted?.acknowledged && deleted?.deletedCount > 1) {
      return res
        .status(200)
        .json({ Message: "Post deleted successfully !", Success: true });
    }

    return res
      .status(200)
      .json({ Message: "Post deleting failed", Success: false });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleAllPostController = async (req, res) => {
  try {
    const posts = await Post.find({});

    return res.status(200).json({
      Message: "Fetched all post's",
      TotalPost: posts.length,
      Success: true,
      PostList: posts,
    });
  } catch (error) {
    return res.status(500).json({ Message: error?.message, Success: false });
  }
};

const handleAllCategoryListController = async (req, res) => {
  try {
    const categoryPost = await Post.aggregate([
      {
        $group: {
          _id: "$Category",
          Post: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$Post" },
      },
    ]);

    return res.status(200).json({
      Message: "Fetched category post successfully !",
      TotalCount: categoryPost.length,
      Success: true,
      TotalPost: categoryPost,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleCategoryWiseFitlerContorller = async (req, res) => {
  try {
    const catt = req.query?.category;
    console.log("catt", catt);
    const categoryList = await Post.find({ Category: catt });
    return res.status(200).json({
      Message: "Category list fetched successfully!",
      Success: true,
      TotalCount: categoryList.length,
      PostList: categoryList,
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false,
    });
  }
};

module.exports = {
  handleAddPostController,
  handleUpdatePostController,
  findAllPostByUserIdController,
  deletePostsByUserController,
  handleAllPostController,
  handleAllCategoryListController,
  handleCategoryWiseFitlerContorller,
};
