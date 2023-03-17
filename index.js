// Run command: 'npx nodemon index.js'
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const rooms = {};

app.use(express.static(path.join(__dirname, "client")));

app.get("/check", (req, res) => {
    res.send("<h1>Game App running...</h1>");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("createGame", () => {
        const roomUniqueId = makeid(6);
        rooms[roomUniqueId] = {};
        socket.join(roomUniqueId);
        socket.emit("newGame", { roomUniqueId: roomUniqueId });
    });

    socket.on("joinGame", (data) => {
        console.log(data);
        if (rooms[data.roomUniqueId] != null) {
            socket.join(data.roomUniqueId);
            socket.to(data.roomUniqueId).emit("playersConnected", {});
            socket.emit("playersConnected");
        }
    });
});

server.listen(3000, () => {
    console.log("server listening on :3000");
});

const makeid = (length) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
