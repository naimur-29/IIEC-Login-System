const express = require("express");
const app = express();

app.use(express.json());

// DB:
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const PORT = 9990;

// routes:
app.get("/", (req, res) => {
  res.send("hello from the server!");
});

// routers:
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(PORT || 1000);
