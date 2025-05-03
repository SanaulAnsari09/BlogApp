const express = require("express");
const { connectToDatabase } = require("./connection");
const userRotuer = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const cors = require("cors");
const checkAuth = require("./middleware/checkAuth");

// database connection
connectToDatabase("mongodb://localhost:27017/blogapp");

const app = express();
app.use(express.json({ limit: "20mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRotuer);
app.use("/posts", checkAuth, postRouter);
app.use("/comment", commentRouter);

app.listen(8080);
