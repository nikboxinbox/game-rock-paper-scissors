var socket = io();

const createGame = () => {
    socket.emit("createGame");
};
const joinGame = () => {
    socket.emit("joinGame");
    roomUniqueId = document.getElementById("roomUniqueId").value;
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
};
