const express = require("express");
const { read } = require("../services/records");
const { getUserByID } = require("../services/users");

const router = express.Router();

router.get("/:name", async (req, res) => {
  // check if admin:
  const admin = await getUserByID(process.env.ADMIN_ID);
  if (admin === null || !admin.active) {
    return res.status(401).json({ message: "Not authorized!" });
  }

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
