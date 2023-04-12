const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const RpsGame = require("./rpsGame");

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on("connection", (socket) => {
  if (waitingPlayer) {
    new RpsGame(waitingPlayer, socket);
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    waitingPlayer.emit("message", "Ожидаем противника.");
  }
  console.log("Socket new connected");
  // socket.emit("message", "Привет, Ты подсоединён!");

  socket.on("message", (text) => {
    io.emit("message", text);
  });
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(3000, () => {
  console.log("RPS GAME STARTED:  http://localhost:3000/");
});
