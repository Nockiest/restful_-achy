"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(gameTime, color, id) {
        this.missingPieces = []; // You might want to replace `any` with the actual type of your pieces
        this.kingMoved = false;
        this.leftRookMoved = false;
        this.rightRookMoved = false;
        this.timeInterval = null;
        this.time = gameTime;
        this.color = color;
        this.id = id;
    }
    updateTime() {
        this.time -= 1;
        // console.log("counting time", this.color, this.time );
        if (this.time <= 0) {
            console.log("TIME RAN OUT", this.time);
        }
    }
    getId() {
        return this.id;
    }
    getTime() {
        return this.time;
    }
    setId(newId) {
        if (this.id === null) {
            this.id = newId;
        }
        else {
            return new Error('trying to change an existing player');
        }
    }
}
exports.default = Player;
