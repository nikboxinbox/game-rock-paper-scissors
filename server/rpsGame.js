class RpsGame {
  constructor(p1, p2) {
    // p1 & p2 - sockets by players
    this._players = [p1, p2];
    this._choice = [null, null];

    this._sendMessageToPlayers("Камень Ножницы Бумага. Начали !");

    this._players.forEach((player, idx) => {
      player.on("choice", (choice) => {
        this._onChoice(idx, choice);
      });
    });
    // [(p1, p2)].forEach((s) =>
    //   s.emit("message", "Камень Ножницы Бумага Начали !")
    // );
  }

  _sendMessageToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit("message", msg);
  }

  _sendMessageToPlayers(msg) {
    this._players.forEach((player) => {
      player.emit("message", msg);
    });
  }

  _onChoice(playerIndex, choice) {
    this._choices[playerIndex] = choice;
    this._sendToPlayer(playerIndex, `Вы выбрали ${turn}`);

    this._checkGameOver();
  }

  _checkGameOver() {
    const choices = this._choices;

    if (choices[0] && choices[1]) {
      this._sendMessageToPlayers("Игра окончена" + choices.join(" : "));
      this._choices = [null, null];
      this._sendMessageToPlayers("Следующий раунд!");
    }
  }
}
module.exports = RpsGame;
