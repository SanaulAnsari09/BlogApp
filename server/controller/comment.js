const Comment = require("../modal/Comment");
const User = require("../modal/user");

const handleAddCommentController = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.PostId || !body?.UserId || !body?.Comment) {
      return res
        .status(400)
        .json({ Message: "All fields are required", Success: false });
    }
    const user = await User.findById(body?.UserId);
    const comment = await Comment.insertOne(body);
    console.log("comment-user", user);

    return res.status(201).json({
      Message: "Comment added successfully !",
      Success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({ Message: error?.mssage, Success: false });
  }
};

const handleGetCommentByPostIdController = async (req, res) => {
  try {
    const postId = req.query?.id;

    const allComment = await Comment.find({ PostId: postId })
      .populate("UserId", "FirstName LastName Profile")
      
    return res.status(200).json({
      Message: "All comments fetched",
      Success: true,
      Comments: allComment,
    });
  } catch (error) {
    return res.status(500).json({ Message: error?.message, Status: false });
  }
};

module.exports = {
  handleAddCommentController,
  handleGetCommentByPostIdController,
};
