const express = require("express");
const { connectToDatabase } = require("./connection");
const userRotuer = require("./routes/user");
const postRouter = require("./routes/post");
const cors = require("cors");
const checkAuth = require("./middleware/checkAuth");

// database connection
connectToDatabase("mongodb://localhost:27017/blogapp");

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRotuer);

app.use("/posts", checkAuth, postRouter);

app.listen(8080);
