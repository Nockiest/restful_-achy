"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cell_js_1 = require("./cell.js");
var utils_js_1 = require("../utils.js");
var defaultPiece_js_1 = require("../pieces/defaultPiece.js");
var bishop_js_1 = require("../pieces/bishop.js");
var Grid = /** @class */ (function () {
    function Grid(height, width, gameState) {
        this.height = height;
        this.width = width;
        this.cells = this.createCellsAndPieces(gameState);
        // this.logPieces()
    }
    Grid.prototype.getPieceFromIdentifier = function (identifier) {
        // switch statement for getting the correct piece type
        if (identifier.toLowerCase() === "b") {
            return bishop_js_1.default;
        }
        else {
            return defaultPiece_js_1.default;
        }
    };
    Grid.prototype.createCellsAndPieces = function (gameState) {
        var cells = [];
        for (var i = 0; i < this.height * this.width; i++) {
            var piece = this.getPieceFromIdentifier(gameState[i]);
            var newPiece = null;
            var color = null;
            if (gameState[i]) {
                console.log("x", gameState[i]);
                color = gameState[i] === gameState[i].toLowerCase() ? 'black' : 'white';
                newPiece = new piece(color, i);
            }
            var newCell = new cell_js_1.default(i, gameState[i], newPiece);
            cells.push(newCell);
        }
        return cells;
    };
    Grid.prototype.instantiatePieces = function (valuearr) {
        if (valuearr.length !== this.height * this.width) {
            throw new Error('Setting new cell value with an array of wrong length', valuearr.length);
        }
        // Loop through the cells and set their values based on the array
        this.cells.forEach(function (cell, index) {
            cell.setValue(valuearr[index]);
            cell.piece = new defaultPiece_js_1.default();
        });
    };
    Grid.prototype.getCellAtIndex = function (index) {
        if ((0, utils_js_1.checkInGameBounds)(index)) {
            return this.cells[index];
        }
    };
    Grid.prototype.getPieceAtIndex = function (index) {
        if ((0, utils_js_1.checkInGameBounds)(index)) {
            return this.cells[index].value;
        }
    };
    Grid.prototype.makeMove = function (from, to) {
        // Ensure that from and to are valid indices
        if ((0, utils_js_1.checkInGameBounds)(from) && (0, utils_js_1.checkInGameBounds)(to)) {
            // Get the values at from and to indices
            var valueFrom = this.cells[from].value;
            var pieceFrom = this.cells[from].piece;
            this.cells[to].value = valueFrom;
            this.cells[from].value = "";
            this.cells[to].piece = pieceFrom;
            this.cells[from].piece = null;
            pieceFrom.index = to;
            pieceFrom.moved = true;
            // this.logPieces()
        }
    };
    Grid.prototype.logGrid = function () {
        // Log the grid for debugging purposes
        console.log(this.cells.map(function (cell) { return cell.value; }));
    };
    Grid.prototype.logPieces = function () {
        // Log the grid for debugging purposes
        console.log(this.cells.map(function (cell) { return cell.piece; }));
    };
    return Grid;
}());
exports.default = Grid;
