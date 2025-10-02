const express = require("express");
const {
  handleSignupUser,
  handleLoginUser,
  getUserDetails,
} = require("../controller/user");

const router = express.Router();

router.post("/signup", handleSignupUser);
router.post("/login", handleLoginUser);
router.get("/getuserdetails", getUserDetails);

module.exports = router;
