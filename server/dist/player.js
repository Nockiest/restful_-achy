"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(gameTime, color) {
        this.missingPieces = []; // You might want to replace `any` with the actual type of your pieces
        this.kingMoved = false;
        this.leftRookMoved = false;
        this.rightRookMoved = false;
        this.time = gameTime;
        this.color = color;
    }
    updateTime() {
        this.time -= 1;
        // console.log("counting time", this.color, this.time );
        if (this.time <= 0) {
            console.log("TIME RAN OUT", this.time);
        }
    }
}
exports.default = Player;
