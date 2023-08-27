const express = require("express");
const router = express.Router();

// local imports:
const { getUsers, getActiveUsers } = require("../services/users");

router.get("/", async (req, res) => {
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

  let users = [];
  activeUsers.forEach((u) => {
    users.push({ name: u.name, id: u.id });
  });

  res.json(users);
});

module.exports = router;
