require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// cors:
const corsOption = {
  origin: ["http://localhost:9999", "http://127.0.0.1:9999"],
  methods: "*",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOption));

// DB:
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// routes:
app.get("/", (req, res) => {
  res.send("hello from the server!");
});

// routers:
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const recordsRouter = require("./routes/records");

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/records", recordsRouter);

app.listen(process.env.PORT || 1000);
