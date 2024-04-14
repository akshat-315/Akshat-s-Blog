const express = require("express");
const authRouter = require("./routes/auth/AuthRoutes.js");
const errorHandler = require("./middlewares/ErrorMiddleware.js");
require("dotenv").config();
require("./db.js")();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

//Error middleware
app.use(errorHandler);

//Routes
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
