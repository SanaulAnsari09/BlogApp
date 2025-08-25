const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res, next) => {
  const body = req.body;

  if (body?.Image) {
    const result = await cloudinary.uploader.upload(body?.Image, {
      folder: "Post",
    });
    req.imgUrl = result.secure_url;
    next()
  } else {
    req.imgUrl = "";
    next();
  }
};

module.exports = uploadImage;
