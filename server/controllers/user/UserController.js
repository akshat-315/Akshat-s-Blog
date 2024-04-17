const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const signOut = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  //whether the user making the request is the same as the user whose ID is specified in the request parameters

  if (req.body.password) {
    if (req.body.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      throw new Error("Username must be between 7 and 20 characters");
    }
    if (req.body.username.includes(" ")) {
      throw new Error("Username cannot contain spaces");
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      throw new Error("Username must be lowercase");
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      throw new Error("Username can only contain letters and numbers");
    }
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      throw new Error("Username already exists");
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.userId) {
    throw new Error("You are not allowed to delete the user");
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  signOut,
  updateUser,
  deleteUser,
};
