const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/globalErrorHandlerMiddleware");

const app = express();
app.use(helmet());

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

//HEALTH CHECK
app.get("/health-check", (req, res) => {
  res.status(200).json("Ok");
});

//AUTHORIZATION ROUTES
app.use("/api/auth", authRoutes);

//USER ROUTES
app.use("/api/protected/user", userRoutes);

//APPLICATION ROUTES
app.use("/api/protected/application", appRoutes);

//RESUME ROUTES
app.use("/api/protected/resume", resumeRoutes);

//GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
