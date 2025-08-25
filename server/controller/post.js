const Post = require("../modal/Post");

const handleAddPostController = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    const imageUrl = req.imgUrl;

    if (!body?.Title || !body?.Category || !body?.Tag || !body?.Description) {
      return res
        .status(400)
        .json({ Message: "All field's are required", Success: false });
    }

    const addPost = await Post.insertOne({
      ...body,
      UserId: user._id?.toString(),
      Image: imageUrl,
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
      !body?.UserId ||
      !body?._id
    ) {
      return res
        .status(400)
        .json({ Message: "All field's are required", Success: false });
    }
    const user = req.user;

    const updatePost = await Post.updateOne(
      { _id: body?._id, UserId: user?._id },
      { $set: body }
    );

    if (updatePost?.modifiedCount === 0) {
      return res
        .status(200)
        .json({ Message: "Post not found or access denied !", Success: true });
    }

    if (updatePost?.modifiedCount >= 1) {
      return res
        .status(200)
        .json({ Message: "Post updated successfully !", Success: true });
    }
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
    const postId = req?.params.id;

    const user = req.user;

    const deleted = await Post.deleteOne({
      _id: postId,
      UserId: user?._id?.toString(),
    });

    if (deleted.deletedCount === 0) {
      return res
        .status(400)
        .json({ Message: "Post not found or action denied!", Success: false });
    }

    if (deleted?.deletedCount >= 1) {
      return res
        .status(200)
        .json({ Message: "Post deleted successfully !", Success: true });
    }
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

const handleSinglePostContorller = async (req, res) => {
  try {
    const postId = req.query?.Id;

    if (postId) {
      const post = await Post.findById(postId);

      return res.status(200).json({
        Message: "Post fetched successfully !",
        Success: true,
        Post: post,
      });
    } else {
      return res
        .status(400)
        .json({ Message: "Must be post id", success: false });
    }
  } catch (error) {
    return res.status(500).json({ Message: error?.message, Status: false });
  }
};

const latestPostController = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      Message: "Latest post fetched successfully !",
      Success: true,
      LatestPost: post,
    });
  } catch (error) {
    return res.status(500).json({ Message: error?.message, Success: false });
  }
};

// const handlePostListByUserId

module.exports = {
  handleAddPostController,
  handleUpdatePostController,
  findAllPostByUserIdController,
  deletePostsByUserController,
  handleAllPostController,
  handleAllCategoryListController,
  handleCategoryWiseFitlerContorller,
  handleSinglePostContorller,
  latestPostController,
};
