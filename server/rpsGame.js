class RpsGame {
  constructor(p1, p2) {
    // p1 & p2 - sockets by players
    this._players = [p1, p2];
    this._choices = [null, null];

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
    this._sendToPlayer(playerIndex, `Вы выбрали ${choice}`);
    this._checkGameOver();
  }

  _checkGameOver() {
    const choices = this._choices;

    if (choices[0] && choices[1]) {
      this._sendToPlayers("Игра окончена " + choices.join(" : "));
      this._choices = [null, null];
      this._sendToPlayers("Следующий раунд!");
    }
  }
}

module.exports = RpsGame;
