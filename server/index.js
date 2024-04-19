const express = require("express");
const authRouter = require("./routes/auth/AuthRoutes.js");
const errorHandler = require("./middlewares/ErrorMiddleware.js");
require("dotenv").config();
require("./db.js")();
const cors = require("cors");
const userRouter = require("./routes/user/UserRoutes.js");
const postRouter = require("./routes/post/PostRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//Error middleware
app.use(errorHandler);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
