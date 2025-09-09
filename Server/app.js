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
const { Server } = require("socket.io");
const http = require("http");
const { validateSocket } = require("./middlewares/validateUserMiddleware");
const {
  createMessage,
  getRecentMessages,
} = require("./services/messageService");
const filter = require("leo-profanity");

//EXPRESS SERVER
const app = express();
//MAIN SERVER OBJECT
const server = http.createServer(app);
//WEB SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    credentials: true,
  },
});
//SECURITY HELMET
app.use(helmet());
//COOKIES
app.use(cookieParser());
//CORS
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
//LOGGING
app.use(morgan("dev"));
//APIS RESPONSE FORMAT
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

//SOCKET VALIDATION
io.use(validateSocket);

const onlineUsers = new Map(); // key: user email, value: socket.id

//SOCKET CONNECTION
io.on("connection", async (socket) => {
  console.log("User connected to Socket");

  onlineUsers.set(socket.user.email, socket.id);

  try {
    let history = await getRecentMessages();
    history = history.reverse();
    socket.emit("load chat history", history);
  } catch (err) {
    console.error("Error loading chat history:", err);
  }

  io.emit("online users", onlineUsers.size);

  socket.on("send chat message", async (msgDetails) => {
    msgDetails.msg = filter.clean(msgDetails.msg);
    createMessage(msgDetails, socket.user.email);
    io.emit("recieve chat message", msgDetails);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.user.email);
    io.emit("online users", onlineUsers.size);
  });
});

module.exports = server;
