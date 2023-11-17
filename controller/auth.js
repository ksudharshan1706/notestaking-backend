const mongoose = require("mongoose");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      //     const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        // .cookie("access_token", token, {
        //   httpOnly: true,
        // })
        .status(200)
        .json(user._doc);
    } else {
      const token = jwt.sign({ id: req.body.email }, process.env.JWT);
      console.log("here", {
        token,
        ...req.body,
      });
      const newUser = new User({
        token,
        ...req.body,
      });
      const savedUser = await newUser.save();
      // const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        // .cookie("access_token", token, {
        //   httpOnly: true,
        // })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json(user._doc);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.send(404).json(err.message);
  }
};
