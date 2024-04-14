const express = require("express");
const { SignUp, SignIn } = require("../../controllers/auth/AuthController");

const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);

module.exports = authRouter;
