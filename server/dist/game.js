"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_js_1 = require("./grid/grid.js");
var player_js_1 = require("./player.js");
var Game = /** @class */ (function () {
    function Game(gameState, gameTime) {
        this.curPlayerIndex = 0;
        this.grid = new grid_js_1.default(8, 8, gameState);
        this.gameTime = gameTime;
        this.players = this.generatePlayers();
        this.checkedPlayer = "none";
        this.timeInterval = null;
        this.gameStarted = false;
    }
    Game.prototype.generatePlayers = function () {
        var whitePlayer = new player_js_1.default(this.gameTime, "white");
        var blackPlayer = new player_js_1.default(this.gameTime, "black");
        return [whitePlayer, blackPlayer];
    };
    Object.defineProperty(Game.prototype, "curPlayer", {
        get: function () {
            return this.players[this.curPlayerIndex];
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.switchPlayer = function () {
        this.curPlayerIndex = 1 - this.curPlayerIndex; // Toggle between 0 and 1
    };
    Game.prototype.startCountingTime = function () {
        var _this = this;
        this.timeInterval = setInterval(function () {
            _this.countTime();
        }, 1000);
    };
    Game.prototype.stopCountingTime = function () {
        clearInterval(this.timeInterval);
    };
    Game.prototype.countTime = function () {
        this.curPlayer.updateTime();
    };
    Game.prototype.getBoard = function () {
        var board = [];
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var cell = this.grid.getCellAtIndex(row * 8 + col);
                var piece = cell.piece
                    ? { piece: cell.piece.abreviation, color: cell.piece.color }
                    : null;
                board.push(piece);
            }
        }
        return board;
    };
    Game.prototype.beginGame = function () {
        console.log("BEGINNING GAME ");
        if (!this.gameStarted) {
            console.log("Game has begun!");
            this.startCountingTime();
            this.gameStarted = true;
        }
        else {
            console.log("The game has already started!");
        }
    };
    Game.prototype.checkMoveValid = function (from, to) {
        console.log(from, to);
        var fromCell = this.grid.getCellAtIndex(from);
        if (fromCell.piece === null) {
            console.log("FROM PIECE NULL");
            return false;
        }
        var toCell = this.grid.getCellAtIndex(to);
        console.log("Making move ", fromCell, toCell);
        console.log("CAN MOVE? ", fromCell.piece.canMove(to, this.grid));
        // code for checking if movement is valid
        return true; //fromCell.piece.canMove(to, this.grid); // return if move is valid
    };
    Game.prototype.processValidMovement = function (from, to) {
        // other code for movement
        this.grid.makeMove(from, to);
        this.switchPlayer(); // Switch to the next player after a valid move
    };
    return Game;
}());
exports.default = Game;
// function findKingIndex(player, board) {
//     if(player === "white"){
//       return board.indexOf("K");
//     } else {
//       return board.indexOf("k");
//     }
//   }
//   function getAllThePieces(player, board){
//     let { gameRepresentation, gameHistory,  } = gameInformation;
//     const whitePiecesPositions = [];
//     const blackPiecesPositions = []
//       for (let i = 0; i <= 63; i++) {
//             const cell = board[i];
//             if (cell !== '') {
//               if(cell === cell.toLowerCase()) {
//               blackPiecesPositions.push(i);
//             }  else {
//               whitePiecesPositions.push(i)
//             }
//         }
//       }
//     return player === "black" ? blackPiecesPositions : whitePiecesPositions;
//   }// funguje správně
//   function isKingInCheck(curPlayer, board) {
//     let whiteKingPos = findKingIndex("white", board);
//     let blackKingPos = findKingIndex("black", board);
//     const whitePiecesPositions =  getAllThePieces("white",board);
//     const blackPiecesPositions =  getAllThePieces("black",board);
//     let whiteInCheck = false;
//     let blackInCheck = false;
//     for (let piece of whitePiecesPositions) {
//       const pieceType =  getPieceType(board[piece])
//       const possibleMoves = pieceType.calculatePossibleMoves(piece, findPiecesColor(board[piece]), board)
//       if (possibleMoves.includes(blackKingPos)) {
//         blackInCheck = true;
//       }
//     }
//     for (let piece of blackPiecesPositions) {
//       const pieceType =  getPieceType(board[piece])
//       const possibleMoves = pieceType.calculatePossibleMoves( piece, findPiecesColor(board[piece]), board)
//       if (possibleMoves.includes(whiteKingPos)) {
//         whiteInCheck = true;
//       }
//     }
//     return {
//       white: whiteInCheck,
//       black: blackInCheck,
//     };
//   }
//   function coordsToIndex(row, col) {
//     return row * 8 + col;
//   }
//   function indexToCoords(index) {
//     const row = Math.floor(index / 8);
//     const col = index % 8;
//     return [row, col];
//   }
//   function isOnSameRow(index1, index2) {
//     return Math.floor((index1) / 8) === Math.floor((index2) / 8);
//   }
//   function isOnSameColumn(index1, index2) {
//     return (index1) % 8 === (index2) % 8;
//   }
//   function isOnSameDiagonal(index1, index2) {
//     return Math.abs(Math.floor((index1 ) / 8) - Math.floor((index2 ) / 8)) === Math.abs((index1) % 8 - (index2) % 8);
//   }
