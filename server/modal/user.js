const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Profile: {
    type: String,
  },
  Password:{
    type:String,
    required:true
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;