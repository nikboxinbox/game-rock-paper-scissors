const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    console.log("Socket new connected");
    socket.emit("message", "Привет, Ты подсоединён!");
});

server.on("error", (err) => {
    console.error("Server error:", err);
});

server.listen(3000, () => {
    console.log("RPS GAME STARTED:  http://localhost:3000/");
});
