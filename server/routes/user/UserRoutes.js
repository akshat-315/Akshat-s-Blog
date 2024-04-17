const express = require("express");
const {
  signOut,
  updateUser,
} = require("../../controllers/user/UserController");
const userRouter = express.Router();

userRouter.post("/sign-out", signOut);
userRouter.put("/update/:userId", updateUser);
userRouter.delete("/delete/:userId", updateUser);

module.exports = userRouter;
