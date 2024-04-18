const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const SignUp = asyncHandler(async (req, res) => {
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

const SignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if user is valid or not
  const validUser = await User.findOne({ email });
  if (!validUser) {
    throw new Error("Invalid email or password");
  }

  //match the password from the database, if the user exists
  const isMatch = await bcrypt.compare(password, validUser.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  //Generate Token using JWT
  const token = jwt.sign(
    { id: validUser?._id, isAdmin: validUser?.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  console.log(token);

  //set the token into cookie (http only)
  res.cookie("token", token, {
    httpOnly: true,
  });

  //send the response
  res.json({
    status: "success",
    message: "Login success",
    _id: validUser?._id,
    username: validUser?.username,
    email: validUser?.email,
  });
});

const Google = asyncHandler(async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString().slice(-8) + Math.random().toString().slice(-8);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  SignUp,
  SignIn,
  Google,
};
