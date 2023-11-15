import Grid from "./grid/grid.js";
import Player from "./player.js";

export default class Game {
  constructor(gameState, gameTime) {
    this.curPlayerIndex = 0; 
    this.grid = new Grid(8, 8, gameState);
    this.gameTime = gameTime;
    this.players = this.generatePlayers();
    this.checkedPlayer = "none";
    this.timeInterval = null; 
    this.gameStarted = false; 
  }

  generatePlayers() {
    var whitePlayer = new Player(this.gameTime, "white");
    var blackPlayer = new Player(this.gameTime, "black");
    return [whitePlayer, blackPlayer];
  }

  get curPlayer() {
    return this.players[this.curPlayerIndex];
  }

  switchPlayer() {
    this.curPlayerIndex = 1 - this.curPlayerIndex; // Toggle between 0 and 1
  }

  startCountingTime() {
    this.timeInterval = setInterval(() => {
      this.countTime();
    }, 1000);  
  }

  stopCountingTime() {
    clearInterval(this.timeInterval);
  }

  countTime() {
    this.curPlayer.updateTime();
  }

  getBoard() {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cell = this.grid.getCellAtIndex(row * 8 + col);
        const piece = cell.piece
          ? { piece: cell.piece.abreviation, color: cell.piece.color }
          : null;
        board.push(piece);
      }
    }
    return board;
  }

  beginGame() {
    console.log("BEGINNING GAME ");
    if (!this.gameStarted) {
      console.log("Game has begun!");
      this.startCountingTime();
      this.gameStarted = true;
    } else {
      console.log("The game has already started!");
    }
  }

  checkMoveValid(from, to) {
    console.log(from, to);
    const fromCell = this.grid.getCellAtIndex(from);
    if (fromCell.piece === null) {
      console.log("FROM PIECE NULL");
      return false;
    }
    const toCell = this.grid.getCellAtIndex(to);
    console.log("Making move ", fromCell, toCell);
    console.log("CAN MOVE? ", fromCell.piece.canMove(to, this.grid));
    // code for checking if movement is valid
    return true//fromCell.piece.canMove(to, this.grid); // return if move is valid
  }

  processValidMovement(from, to) {
    // other code for movement
    this.grid.makeMove(from, to);
    this.switchPlayer(); // Switch to the next player after a valid move
  }
}

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
