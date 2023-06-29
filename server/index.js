const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connected Successfully");
}).catch(error => {
  console.log(error.message);
});

app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${ process.env.PORT }`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", socket => {
  global.chatSocket = socket;

  socket.on("add-user", userId => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-msg", data.message);
    }
  });
});
