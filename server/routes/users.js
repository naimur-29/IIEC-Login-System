const express = require("express");
const router = express.Router();

// local imports:
const { getUsers, getActiveUsers, getUserByID } = require("../services/users");

router.get("/", async (req, res) => {
  // check if admin:
  const admin = await getUserByID(process.env.ADMIN_ID);
  console.log(admin);
  if (admin === null || !admin.active) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  const users = await getUsers();

  if (users?.status) {
    res.status(response.status).json({ message: response.message });
  }

  res.json(users);
});

router.get("/active", async (req, res) => {
  const activeUsers = await getActiveUsers();

  if (activeUsers?.status) {
    res.status(response.status).json({ message: response.message });
  }

  res.json(activeUsers);
});

router.get("/:id", async (req, res) => {
  // check if admin:
  const admin = await getUserByID(process.env.ADMIN_ID);
  console.log(admin);
  if (admin === null || !admin.active) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  const user = await getUserByID(req.params.id);

  if (user?.status) {
    res.status(response.status).json({ message: response.message });
  }

  res.json(user);
});

module.exports = router;
