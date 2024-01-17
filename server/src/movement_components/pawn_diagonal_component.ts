import { diagonalDirections, straightDirections } from "../types/movementTypes";
import { BoardIndex, MovesComponentArgs } from "../types/types";
import diagonalMovesComponent from "./diagonal_move";
 
const pawnDiagonalMoveComponent = ({
  startPosition,
  pieceColor,
  grid,
  range,
  directions,
  moved
}: MovesComponentArgs   ): number[] => {
  const real_move_range = 1;

  // Annotate the type of pawnDirections
  const pawnDirections: (straightDirections | diagonalDirections)[] =
    pieceColor === 'white' ? ['up-left', 'up-right'] : ['down-left', 'down-right'];

  let possibleMoves = diagonalMovesComponent({
    startPosition,
    pieceColor,
    grid,
    range: real_move_range,
    directions: pawnDirections,
    moved
  });
  const filteredMoves = possibleMoves.filter((move) => {
    const cellValue = grid.getPieceAtIndex(move as BoardIndex);
  
    // Filter out values that are either null, undefined, or empty strings
    return cellValue !== null && cellValue !== undefined && cellValue !== '';
  });

  console.log('possible diagonal moves', startPosition, filteredMoves);
  return filteredMoves;
};

export default pawnDiagonalMoveComponent;