"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell = /** @class */ (function () {
    function Cell(index, startValue, piece) {
        this.index = index;
        this.value = startValue;
        this.piece = piece;
    }
    Cell.prototype.changeValue = function (newValue) {
        if (typeof (newValue) != "string") {
            console.log("DONT CHANGE VALUE TO SOMETHING DIFFERENT THAN A STRING");
            return;
        }
        this.value = newValue;
        console.log("value changed sucesfully ", this.value);
    };
    return Cell;
}());
exports.default = Cell;
