const Comment = require("../modal/Comment");

const handleAddCommentController = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.PostId || !body?.UserId || !body?.Comment) {
      return res
        .status(400)
        .json({ Message: "All fields are required", Success: false });
    }
    const comment = await Comment.insertOne(body);
    return res.status(201).json({
      Message: "Comment added successfully !",
      Success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({ Message: error?.mssage, Success: false });
  }
};

module.exports = { handleAddCommentController };
