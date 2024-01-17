import Grid from "../grid/grid";
import diagonalMovesComponent from "../movement_components/diagonal_move";
import pawnDiagonalMoveComponent from "../movement_components/pawn_diagonal_component";
import pawnStraightMoveComponent from "../movement_components/pawn_foward_component";
import straightMovesComponent from "../movement_components/straightMoveComp";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class Pawn extends Piece {
    constructor(color: PlayerColor, index: BoardIndex) {
      super(color, index);  
      this.directions = color === 'white' ? ['up', 'up-left', 'up-right'] : ['down', 'down-left', 'down-right'];
      this.abbreviation = color === 'white' ? 'P' : 'p';
      
      this.movementFunctions.push(pawnDiagonalMoveComponent, pawnStraightMoveComponent);
      this.range = 1
 

    }

    // canMove(targetPosition: BoardIndex, grid: Grid) {
    //   // let super_res = super.canMove(targetPosition , grid )
    //   console.log('making pawn move' , straightMovesComponent({startPosition:this.index, pieceColor:this.color, grid:grid, range:2, directions:this.directions}).indexOf(targetPosition) !== -1,
    //   diagonalMovesComponent({startPosition:this.index, pieceColor:this.color, grid:grid, range:this.range, directions:this.directions}).indexOf(targetPosition) ) 
    //   for (const movementFunction of this.movementFunctions) {
    //     if (movementFunction == straightMovesComponent) {
    //       let temporary_range = this.moved? 1 : 2
    //       if( movementFunction({startPosition:this.index, pieceColor:this.color, grid:grid, range:temporary_range, directions:this.directions}).indexOf(targetPosition) !== -1){
    //         return true
    //       }
    //     } else if  (movementFunction({startPosition:this.index, pieceColor:this.color, grid:grid, range:this.range, directions:this.directions}).indexOf(targetPosition) !== -1)  {
    //       if (grid. getCellAtIndex(targetPosition)){
    //         return true
    //       }
          
    //     }
 
    //   }
    //   return false;
    // }
  }
  