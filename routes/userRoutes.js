//Task-2: Registration Endpoint

const express = require("express");
const User = require("../models/User");
const router = express.Router();

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

//export router
module.exports = router;
