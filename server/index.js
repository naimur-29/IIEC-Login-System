const express = require("express");
const app = express();

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
