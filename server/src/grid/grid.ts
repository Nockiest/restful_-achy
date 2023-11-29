import Cell from "./cell";
import { checkInGameBounds } from "../utils";
import Piece from "../pieces/defaultPiece";
import Bishop from "../pieces/bishop";
import {   Fixed64LengthBoard, PieceLetter, BoardIndex } from "../types/types";

export default class Grid {
  private height: number;
  private width: number;
  cells: Cell[];

  constructor(height: number, width: number, gameState: PieceLetter[]) {
    this.height = height;
    this.width = width;
    this.cells = this.createCellsAndPieces(gameState);
    // this.logPieces();
  }

  private getPieceFromIdentifier(identifier: PieceLetter): typeof Piece {
    // switch statement for getting the correct piece type
    if (identifier.toLowerCase() === "b") {
      return Bishop;
    } else {
      return Piece;
    }
  }

  private createCellsAndPieces(gameState: PieceLetter[]): Cell[] {
    const cells: Cell[] = [];
    for (let i = 0; i < this.height * this.width; i++) {
      const pieceType = this.getPieceFromIdentifier(gameState[i]);
      const newPiece = new pieceType(gameState[i].toLowerCase(), i);
      const newCell = new Cell(i, gameState[i], newPiece);
      cells.push(newCell);
    }
    return cells;
  }

  public instantiatePieces(valuearr: Fixed64LengthBoard): void {
    

    // Loop through the cells and set their values based on the array
    this.cells.forEach((cell, index) => {
      cell.changeValue(valuearr[index]);
      cell.piece = new Piece();
    });
  }

  public getCellAtIndex(index: BoardIndex): Cell | undefined {
    if (checkInGameBounds(index)) {
      return this.cells[index];
    }
  }

  public getPieceAtIndex(index: BoardIndex): PieceLetter | undefined {
    if (checkInGameBounds(index)) {
      return this.cells[index].letterValue;
    }
  }

  public makeMove(from: BoardIndex, to: BoardIndex): void {
    // Ensure that from and to are valid indices
    if (checkInGameBounds(from) && checkInGameBounds(to)) {
      // Get the values at from and to indices
      const valueFrom = this.cells[from].letterValue;
      const pieceFrom = this.cells[from].piece;

      this.cells[to].letterValue = valueFrom;
      this.cells[from].letterValue = '';
      this.cells[to].piece = pieceFrom;
      this.cells[from].piece = null;

      if (pieceFrom) {
        pieceFrom.index = to;
        pieceFrom.moved = true;
      }

      // this.logPieces();
    }
  }

  public logGrid(): void {
    // Log the grid for debugging purposes
    console.log(this.cells.map((cell) => cell.letterValue));
  }

  public logPieces(): void {
    // Log the grid for debugging purposes
    console.log(this.cells.map((cell) => cell.piece));
  }
}
