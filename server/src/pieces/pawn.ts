import diagonalMovesComponent from "../movement_components/diagonal_move";
import straightMovesComponent from "../movement_components/straightMoveComp";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class Pawn extends Piece {
    constructor(color: PlayerColor, index: BoardIndex) {
      super(color, index);
      this.directions = color === 'white' ? ['up', 'up-left', 'up-right'] : ['down', 'down-left', 'down-right'];
      this.abbreviation = color === 'white' ? 'P' : 'p';
      
      this.movementFunctions.push(straightMovesComponent, diagonalMovesComponent);
      this.range = 1
    }
  }
  