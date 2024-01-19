import Grid from '../grid/grid';
import { BoardIndex, PlayerColor, MovesComponentArgs,   } from '../types/types';


const diagonalMovesComponent = ({
  startPosition,
  pieceColor,
  grid,
  range = 8,
  directions = ['up-left', 'up-right', 'down-left', 'down-right'],
}: MovesComponentArgs): number[] => {
  if (!range) {
    console.error('You forgot to add range');
    return [];
  }

  const row = Math.floor(startPosition / 8);
  const col = startPosition % 8;
  const possibleMoves: number[] = [];

  // Define specific direction offsets
  const directionOffsets: { [key: string]: number[] } = {
    'up-left': [-1, -1],
    'up-right': [-1, 1],
    'down-left': [1, -1],
    'down-right': [1, 1],
  };

  directions.forEach((direction) => {
    // Check if the direction is valid
    if (directionOffsets[direction]) {
      const [rowOffset, colOffset] = directionOffsets[direction];

      for (let i = 1; i <= range; i++) {
        const newRow = row + i * rowOffset;
        const newCol = col + i * colOffset;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
          break;
        }

        const index = newRow * 8 + newCol;

        if (
          grid.cells[index].piece !== null &&
          grid.cells[index].piece !== undefined
        ) {
          const pieceLetter = grid?.cells[index]?.piece?.abbreviation;
          if (!pieceLetter) {
            console.error("PIECE DOESN'T EXIST", grid.cells[index]);
            break;
          }
          const attackedPieceColor =
            pieceLetter.toLowerCase() === pieceLetter ? 'black' : 'white';

          if (attackedPieceColor !== pieceColor) {
            possibleMoves.push(index);
            break;
          } else {
            break;
          }
        } else {
          possibleMoves.push(index);
        }
      }
    } else {
      console.error(`Invalid direction: ${direction} ${directions} ${Object.keys(directionOffsets)}`);
    }
  });

 
  return possibleMoves;
};

export default diagonalMovesComponent;
