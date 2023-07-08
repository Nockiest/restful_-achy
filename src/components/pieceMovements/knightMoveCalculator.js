function calculateKnightMoves(position, color, board) {
    const row = Math.floor(position / 8);
    const col = position % 8;
    const possibleMoves = [];
  
    const offsets = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];
  
    for (const offset of offsets) {
      const newRow = row + offset.row;
      const newCol = col + offset.col;
  
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const index = newRow * 8 + newCol;
        const piece = board[index];
        const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
        // Check if the target cell is empty or contains an opponent's piece
        if (piece === "" || (attackedPiecColor !== color)) {
          possibleMoves.push(index);
        }
      }
    }
  
    return possibleMoves;
  }

  export default calculateKnightMoves