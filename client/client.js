const socket = io();

let roomUniqueId = null;

const createGame = () => {
    socket.emit("createGame");
};
const joinGame = () => {
    socket.emit("joinGame");
    roomUniqueId = document.getElementById("roomUniqueId").value;
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
};

socket.on("newGame", (data) => {
    roomUniqueId = data.roomUniqueId;
    document.getElementById("initial").style.display = "none";
    document.getElementById("gamePlay").style.display = "block";
    let copyButton = document.createElement("button");
    copyButton.style.display = "block";
    copyButton.innerText = "Копировать код";
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(roomUniqueId).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    });

    document.getElementById(
        "waitingArea"
    ).innerHTML = `Ждём соперника. Передайте ему код для присоединения:  ${roomUniqueId}`;
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(roomUniqueId).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    });
    document.getElementById("waitingArea").appendChild(copyButton);
});
