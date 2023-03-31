const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(3000, () => {
    console.log("RPS GAME STARTED:  http://localhost:3000/");
});
