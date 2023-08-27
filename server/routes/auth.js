const express = require("express");
const router = express.Router();

const { registerUser, signUserIn, signUserOut } = require("../services/auth");

router.post("/login", async (req, res) => {
  const userData = req.body;
  const response = await signUserIn({ userData });

  res.status(response.status).json({ message: response.message });
});

router.post("/logout", async (req, res) => {
  const userData = req.body;
  const response = await signUserOut({ userData });

  res.status(response.status).json({ message: response.message });
});

router.post("/register", async (req, res) => {
  const userData = req.body;
  userData.createdAt = new Date();
  const response = await registerUser({ userData });

  res.status(response.status).json({ message: response.message });
});

module.exports = router;
