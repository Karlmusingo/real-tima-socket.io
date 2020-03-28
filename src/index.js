import express from "express";
import cors from "cors";
const http = require("http");
const socketIo = require("socket.io");

import routers from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", function(socket) {
  socket.on("send-message", message => {
    socket.broadcast.emit("chat-message", message);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

app.use("*", (req, res) =>
  res.status(404).json({
    message: "API endpoint not found!"
  })
);
export default server;
