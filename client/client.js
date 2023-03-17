const socket = io();

let roomUniqueId = null;
let player1 = false;

const createGame = () => {
    player1 = true;
    socket.emit("createGame");
};
const joinGame = () => {
    roomUniqueId = document.getElementById("roomUniqueId").value;
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
};

const sendChoice = (rpsValue) => {
    const choiceEvent = player1 ? "player1Choice" : "player2Choice";
    socket.emit(choiceEvent, {
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId,
    });
    let playerChoiceButton = document.createElement("button");
    playerChoiceButton.style.display = "block";
    playerChoiceButton.classList.add(rpsValue.toString().toLowerCase());
    playerChoiceButton.innerText = rpsValue;
    document.getElementById("player1Choice").innerHTML = "";
    document.getElementById("player1Choice").appendChild(playerChoiceButton);
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
            () => {
                console.log("Async: Copying to clipboard was successful!");
            },
            (err) => {
                console.error("Async: Could not copy text: ", err);
            }
        );
    });
    document.getElementById("waitingArea").appendChild(copyButton);
});

socket.on("playersConnected", () => {
    document.getElementById("initial").style.display = "none";
    document.getElementById("waitingArea").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
});

socket.on("player1Choice", (data) => {
    if (!player1) {
        createOpponentChoiceButton(data);
    }
});

socket.on("player2Choice", (data) => {
    if (player1) {
        createOpponentChoiceButton(data);
    }
});

socket.on("result", (data) => {
    let winnerText = "";
    if (data.winner != "draw") {
        if (data.winner == "player1" && player1) {
            winnerText = "Вы выиграли!";
        } else if (data.winner == "player1") {
            winnerText = "Вы проиграли.";
        } else if (data.winner == "player2" && !player1) {
            winnerText = "Вы выиграли!";
        } else if (data.winner == "player2") {
            winnerText = "Вы проиграли.";
        }
    } else {
        winnerText = "Ничья!";
    }
    document.getElementById("opponentState").style.display = "none";
    document.getElementById("opponentButton").style.display = "block";
    document.getElementById("winnerArea").innerHTML = winnerText;
});

const createOpponentChoiceButton = (data) => {
    document.getElementById("opponentState").innerHTML = "Противник сделал выбор";
    let opponentButton = document.createElement("button");
    opponentButton.id = "opponentButton";
    opponentButton.classList.add(data.rpsValue.toString().toLowerCase());
    opponentButton.style.display = "none";
    opponentButton.innerText = data.rpsValue;
    document.getElementById("player2Choice").appendChild(opponentButton);
};
