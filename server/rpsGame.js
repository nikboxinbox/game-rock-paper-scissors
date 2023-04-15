class RpsGame {
  constructor(p1, p2) {
    // p1 & p2 - sockets by players
    this._players = [p1, p2];
    this._choices = [null, null];

    this._ratio = { paper: "rock", rock: "scissors", scissors: "paper" };

    this._rusDictionary = {
      rock: "КАМЕНЬ",
      scissors: "НОЖНИЦЫ",
      paper: "БУМАГА",
    };

    this._sendToPlayers("Камень Ножницы Бумага. Выбирай !");

    this._players.forEach((player, idx) => {
      player.on("choice", (choice) => {
        this._onChoice(idx, choice);
      });
    });
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit("message", msg);
  }

  _sendToPlayers(msg) {
    this._players.forEach((player) => {
      player.emit("message", msg);
    });
  }

  _onChoice(playerIndex, choice) {
    this._choices[playerIndex] = choice;
    this._sendToPlayer(
      playerIndex,
      `Вы выбрали ${this._rusDictionary[choice]}`
    );
    this._checkGameOver();
  }

  _checkGameOver() {
    if (this._choices[0] && this._choices[1]) {
      this._sendToPlayers(
        `Игра окончена  ${this._rusDictionary[this._choices[0]]} :  ${
          this._rusDictionary[this._choices[1]]
        }`
      );

      this._getGameResul();

      this._choices = [null, null];

      this._sendToPlayers("Следующий раунд!");
    }
  }

  _getGameResul() {
    if (this._choices[0] == this._choices[1]) {
      this._sendToPlayers("Ничья !");
    } else {
      this._ratio[this._choices[0]] == this._choices[1]
        ? this._sendResultMessage(this._players[0], this._players[1])
        : this._sendResultMessage(this._players[1], this._players[0]);
    }
  }
  _sendResultMessage(winner, looser) {
    winner.emit("message", "Вы выиграли!");
    looser.emit("message", "Вы проиграли!");
  }
}

module.exports = RpsGame;
