const socket = io();
// Или с указанием порта сервера(const socket = io.connect('http://....'))
let roomUniqueId = null;
let player1 = false;
const joinGame = (code) => {
    roomUniqueId = code ? code : document.getElementById("roomUniqueId").value;
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
};

const codeFromLink =
    document.location.pathname.length > 1
        ? document.location.pathname.slice(1)
        : null;
if (codeFromLink) {
    joinGame(codeFromLink);
}

const createGame = () => {
    player1 = true;
    socket.emit("createGame");
};

const sendChoice = (rpsValue) => {
    const choiceEvent = player1 ? "player1Choice" : "player2Choice";
    socket.emit(choiceEvent, {
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId,
    });
    const playerChoiceButton = document.createElement("button");
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
    const copyCodeButton = document.createElement("button");
    copyCodeButton.style.display = "block";
    copyCodeButton.innerText = "Копировать код";
    copyCodeButton.addEventListener("click", () => {
        navigator.clipboard.writeText(roomUniqueId).then(
            () => {
                console.log("Copying to code was successful!");
            },
            (err) => {
                console.error("Could not copy code: ", err);
            }
        );
    });
    const joinLink = `http://localhost:3000/${roomUniqueId}`;
    let copyLinkButton = document.createElement("button");
    copyLinkButton.style.display = "block";
    copyLinkButton.innerText = "Копировать ссылку";
    copyLinkButton.addEventListener("click", () => {
        navigator.clipboard.writeText(joinLink).then(
            () => {
                console.log("Copying to joinLink was successful!");
            },
            (err) => {
                console.error(" Could not copy joinLink: ", err);
            }
        );
    });

    document.getElementById(
        "waitingArea"
    ).innerHTML = `Ожидаем соперника. <br/> Передайте ему код для присоединения:  ${roomUniqueId}.  <br/> Или передайте ссылку для присоединения: ${joinLink}`;

    document.getElementById("waitingArea").appendChild(copyCodeButton);
    document.getElementById("waitingArea").appendChild(copyLinkButton);
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
    const opponentButton = document.createElement("button");
    opponentButton.id = "opponentButton";
    opponentButton.classList.add(data.rpsValue.toString().toLowerCase());
    opponentButton.style.display = "none";
    opponentButton.innerText = data.rpsValue;
    document.getElementById("player2Choice").appendChild(opponentButton);
};
