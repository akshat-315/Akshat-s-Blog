const express = require("express");
const { signOut } = require("../../controllers/user/UserController");
const userRouter = express.Router();

userRouter.post("/sign-out", signOut);

module.exports = userRouter;
