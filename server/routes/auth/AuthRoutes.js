const express = require("express");
const {
  SignUp,
  SignIn,
  Google,
} = require("../../controllers/auth/AuthController");

const authRouter = express.Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/google", Google);

module.exports = authRouter;
