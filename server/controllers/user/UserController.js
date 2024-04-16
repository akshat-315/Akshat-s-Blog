const asyncHandler = require("express-async-handler");

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

module.exports = {
  signOut,
};
