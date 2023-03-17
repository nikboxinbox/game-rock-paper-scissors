// Run command: 'npx nodemon index.js'
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "client")));

app.get("/check", (req, res) => {
    res.send("<h1>Game App running...</h1>");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
});

server.listen(3000, () => {
    console.log("server listening on :3000");
});
