var socket = io();

const createGame = () => {
    socket.emit("createGame");
};
