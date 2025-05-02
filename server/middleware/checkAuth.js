const jwt = require("jsonwebtoken");
const User = require("../modal/user");
const secretKey = "JSHDJHSK76S7D68S87DS8@34#%SDS2";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verify = jwt.verify(token, secretKey);

      const findUser = await User.findOne({ Email: verify.Email });

      if (!findUser) {
        return res
          .status(400)
          .json({ Message: "User doesn't exist", Success: false });
      }

      req.user = findUser;
      next();
    } else {
      return res
        .status(401)
        .json({ Message: "Unauthorized users", Success: false });
    }
  } catch (error) {
    return res.status(401).json({ Message: error.message, Success: false });
  }
};

module.exports = checkAuth;