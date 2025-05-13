const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("BODY RECEIVED:", req.body);

    if (!username || !password) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(200).json({ token: "dummy_token_" + username });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
