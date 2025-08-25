const mongoose = require("mongoose");

const connectToDatabase = async (url) => {
  mongoose
    .connect(url)
    .then((vlaue) => {
      console.log("Database connected successfully !");
    })
    .catch((err) => {
      console.log("Database connection failed");
    });
};

module.exports = { connectToDatabase };
