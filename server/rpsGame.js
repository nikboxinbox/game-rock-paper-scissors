class RpsGame {
    constructor(p1, p2) {
        // p1 & p2 - sockets by players
        this._p1 = p1;
        this._p2 = p2;
        [p1, p2].forEach((s) =>
            s.emit("message", "Камень Ножницы Бумага Начали !")
        );
    }
}
module.exports = RpsGame;
