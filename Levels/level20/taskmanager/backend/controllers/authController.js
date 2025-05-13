const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register new user (with hashing)
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash password
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    console.log("User registered:", newUser);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

// Login user (with password check)
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password); // 🔐 Check hashed password
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secret,
      { expiresIn: "1h" }
    );

    res.json({ token, msg: "Login successful" });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error during login" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
