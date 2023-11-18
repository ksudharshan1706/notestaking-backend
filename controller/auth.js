const mongoose = require("mongoose");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(500).json({ message: "user already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(req.body.password, salt);
      const token = jwt.sign({ id: req.body.email }, process.env.JWT);
      const newUser = new User({
        token,
        ...req.body,
        password: hashedpassword,
      });
      //console.log(newUser);
      const savedUser = await newUser.save();
      //console.log(savedUser._doc);
      res.status(200).json(savedUser._doc);
    }
  } catch (err) {
    res.status(500);
  }
};

exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        res.status(404).json({ message: "Wrong credentials" });
      } else {
        res.status(200).json(user._doc);
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};
