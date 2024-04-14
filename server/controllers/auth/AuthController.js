const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const SignUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //Validate
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill out all the fields");
    }

    //Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error(`User with the email: ${email} already exists!`);
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();
    res.json({
      status: true,
      message: "User Registered successfully",
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  SignUp,
};
