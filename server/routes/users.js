const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users!");
});

router.get("/active", (req, res) => {
  res.send("active users!");
});

// router.get("/:key", (req, res) => {
//   res.send(`You've requested for ${req.params.key}`);
// });

module.exports = router;
