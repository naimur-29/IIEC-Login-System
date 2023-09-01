const express = require("express");
const { read } = require("../services/records");

const router = express.Router();

router.get("/:name", async (req, res) => {
  const filePath = `./records/${req.params.name}.csv`;
  const data = await read(filePath);

  if (data === undefined) {
    res.status(404).json({ message: "File doesn't exist!" });
  } else {
    res.download(filePath, `${req.params.name}.csv`, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
      }
    });
  }
});

module.exports = router;
