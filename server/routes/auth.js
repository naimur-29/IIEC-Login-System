const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("register");
});

router.post("/logout", (req, res) => {
  res.send("logout!");
});

router.post("/register", (req, res) => {
  res.send("register");
});

module.exports = router;
