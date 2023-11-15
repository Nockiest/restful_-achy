import Cell from "./cell.js"
import { checkInGameBounds } from "../utils.js";
import Piece from "../pieces/defaultPiece.js";
import Bishop from "../pieces/bishop.js";

export default class Grid {
  constructor(height, width, gameState) {
    this.height = height;
    this.width = width;
    this.cells = this.createCellsAndPieces(gameState);
    // this.logPieces()
  }

  getPieceFromIdentifier(identifier){
    // switch statement for getting the correct piece type
    if (identifier.toLowerCase() === "b"){
      return Bishop
    } else{
      return Piece
    }
    
  }

  createCellsAndPieces(gameState) {
    const cells = [];
    for (let i = 0; i < this.height * this.width; i++) {
        var piece = this.getPieceFromIdentifier(gameState[i]);
        var newPiece = null;
        var color = null;
         
        if (gameState[i]) {
            console.log("x",gameState[i])
            color = gameState[i] === gameState[i].toLowerCase() ? 'black' : 'white';
            newPiece = new piece(color, i);
        }
        var newCell = new Cell(i, gameState[i], newPiece);
        cells.push(newCell);
    }
    return cells;
}

  instantiatePieces(valuearr) {
    if (valuearr.length !== this.height * this.width) {
      throw new Error('Setting new cell value with an array of wrong length', valuearr.length);
    }

    // Loop through the cells and set their values based on the array
    this.cells.forEach((cell, index) => {
      cell.setValue(valuearr[index]);
      cell.piece =  new Piece()
    });
  }

  getCellAtIndex(index) {
    if(checkInGameBounds(index)){return this.cells[index];}
  }
  getPieceAtIndex(index){
    if(checkInGameBounds(index)){return this.cells[index].value}
  }

  makeMove(from, to) {
    // Ensure that from and to are valid indices
    if (checkInGameBounds(from) && checkInGameBounds(to)  ) {
      // Get the values at from and to indices
      const valueFrom = this.cells[from].value 
      const pieceFrom = this.cells[from].piece
      this.cells[to].value = valueFrom 
      this.cells[from].value = `` 
      this.cells[to].piece = pieceFrom 
      this.cells[from].piece = null 
      pieceFrom.index = to
      pieceFrom.moved = true
      // this.logPieces()
    }

   
  }

   
  logGrid() {
    // Log the grid for debugging purposes
    console.log(this.cells.map(cell => cell.value));
  }
  logPieces() {
    // Log the grid for debugging purposes
    console.log(this.cells.map(cell => cell.piece));
  }
}