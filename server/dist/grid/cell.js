"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(index, startValue, piece) {
        this.index = index;
        this.letterValue = startValue;
        this.piece = piece;
    }
    changeValue(newValue) {
        // if (newValue === null) {
        //     console.log("DON'T CHANGE VALUE TO NULL");
        //     return;
        // }
        // if (typeof newValue !== "string") {
        //     console.log("DON'T CHANGE VALUE TO SOMETHING DIFFERENT THAN A STRING");
        //     return;
        // }
        this.letterValue = newValue;
        console.log("Value changed successfully", this.letterValue);
    }
}
exports.default = Cell;
