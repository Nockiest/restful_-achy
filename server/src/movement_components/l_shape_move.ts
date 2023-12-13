import Grid from '../grid/grid';
import { BoardIndex, PlayerColor } from '../types/types';

const knightMovesComponent = (
  startPosition: BoardIndex,
  pieceColor: PlayerColor,
  grid: Grid
): number[] => {
  const row = Math.floor(startPosition / 8);
  const col = startPosition % 8;
  const possibleMoves: number[] = [];

  const directions: { row: number; col: number }[] = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 },
  ];

  directions.forEach(({ row:rowOffset, col:colOffset }) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const index = newRow * 8 + newCol;
      const cellValue = grid.cells[index].letterValue;

      // Check if grid.cells[index].piece is not null or undefined
      if (grid.cells[index].piece !== null && grid.cells[index].piece !== undefined) {
        const pieceLetter = grid.cells[index].piece?.abbreviation;
        if (!pieceLetter) {
          console.error("PIECE DOESN'T EXIST", grid.cells[index]);
        } else {
          const attackedPieceColor = pieceLetter.toLowerCase() === pieceLetter ? 'black' : 'white';

          if (attackedPieceColor !== pieceColor) {
            possibleMoves.push(index);
          }
        }
      } else {
        possibleMoves.push(index);
      }
    }
  });

  console.log(startPosition, possibleMoves);
  return possibleMoves;
};

export default knightMovesComponent;