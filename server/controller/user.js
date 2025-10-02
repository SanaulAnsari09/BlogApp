const User = require("../modal/user");
const jwt = require("jsonwebtoken");
const secretKey = "JSHDJHSK76S7D68S87DS8@34#%SDS2";
const bcrypt = require("bcrypt");

const handleSignupUser = async (req, res) => {
  try {
    const body = req.body;

    if (!body.FirstName || !body.LastName || !body.Email || !body.Password) {
      return res
        .status(400)
        .json({ Message: "All fields are required", Success: false });
    }

    const hashPassword = await hashedPassword(body?.Password);

    const add = await User.insertOne({ ...body, Password: hashPassword });

    if (add) {
      return res.status(201).json({
        Message: "User created successfully !",
        Success: true,
        Id: add?._id,
      });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email) {
      return res
        .status(400)
        .json({ Message: "Email is required", Success: false });
    }

    if (!Password) {
      return res
        .status(400)
        .json({ Message: "Password is required", Success: false });
    }

    const findUser = await User.findOne({ Email });

    if (!findUser) {
      return res
        .status(400)
        .json({ Message: "User not exist", Success: false });
    }

    const isMatchPassword = await bcrypt.compare(Password, findUser?.Password);

    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ Message: "Password doesn't match", Success: false });
    }

    const token = jwt.sign({ Email: findUser.Email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      Message: "User login successfully !",
      User: {
        Id: findUser?._id,
        Name: `${findUser?.FirstName} ${findUser?.LastName}`,
        Profile: findUser?.Profile,
        Token: token,
      },
      Success: true,
    });
  } catch (error) {
    return res.status(200).json({ Message: error?.message, Success: false });
  }
};

const getUserDetails = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId).select("-Password");

    if (!user) {
      return res.status(404).json({
        Message: "User not found.",
        Success: false,
      });
    }
    return res.status(200).json({
      Message: "User details fetched successfuly!",
      User: user,
      Success: true,
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false,
    });
  }
};

async function hashedPassword(password) {
  const saltedCount = 10;

  try {
    const hashed = await bcrypt.hash(password, saltedCount);
    return hashed;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to hash password");
  }
}

module.exports = { handleSignupUser, handleLoginUser, getUserDetails };
