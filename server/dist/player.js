"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(gameTime, color) {
        this.time = gameTime;
        this.missingPieces = [];
        this.kingMoved = false;
        this.leftRookMoved = false;
        this.rightRookMoved = false;
        this.color = color;
    }
    Player.prototype.updateTime = function () {
        this.time -= 1;
        // console.log("counting time", this.color, this.time );
        if (this.time <= 0) {
            console.log("TIME RAN OUT", this.time);
        }
    };
    return Player;
}());
exports.default = Player;
