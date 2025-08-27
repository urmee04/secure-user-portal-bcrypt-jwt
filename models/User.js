//import mongoose and bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

//pre-save middleware to hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    //hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//create User model from schema
const User = mongoose.model("User", userSchema);

//export the User model for use in other files
module.exports = User;
