const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

//-----------------------------
//Task-2: Registration Endpoint
//-----------------------------

//POST/ api/users/register

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "user already exists",
      });
    }
    //create new user
    const newUser = await User.create({ username, email, password });
    //return user without password
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

//-----------------------
// Task-3: Login Endpoint
//-----------------------

//POST /api/users/login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    //check password
    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    //create JWT
    const jwtToken = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    //respond with token and user data
    res.json({
      jwtToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//export router
module.exports = router;
