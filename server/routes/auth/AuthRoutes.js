const express = require("express");
const { SignUp } = require("../../controllers/auth/AuthController");

const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);

module.exports = authRouter;
