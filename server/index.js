const express = require("express");
const { connectToDatabase } = require("./connection");
const userRotuer = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const cors = require("cors");
const checkAuth = require("./middleware/checkAuth");
const uri =
  "mongodb+srv://helloansar09:qH964hBIrc4VVR9Q@cluster0.xagesdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// database connection
connectToDatabase(uri);

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
