const express = require("express");

const router = express.Router();

router.get("/:name", async (req, res) => {
  res.send("hello from records");
});

module.exports = router;
