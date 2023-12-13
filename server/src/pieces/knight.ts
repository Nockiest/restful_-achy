import knightMovesComponent from "../movement_components/l_shape_move";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class Knight extends Piece {
    constructor(color: PlayerColor, index: BoardIndex) {
      super(color, index);
      this.abbreviation = color === 'white' ? 'N' : 'n';
      this.movementFunctions.push(knightMovesComponent);
    }
  }
  