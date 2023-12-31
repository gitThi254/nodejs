const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CustomeError = require("./Utils/CustomError");
const globalErrorHandler = require("./controllers/err.controller");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/tasks.route");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.URL_ORIGIN,
    credentials: true,
  })
);
console.log("hello");
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.all("*", (req, res, next) => {
  return next(
    new CustomeError(`Can't not ${req.originalUrl} on the server!`, 404)
  );
});
app.use(globalErrorHandler);

module.exports = app;
