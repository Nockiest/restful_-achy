const diagonalMovesComponent = (position, pieceColor, board, range = 8, directions = ['up-left', 'up-right', 'down-left', 'down-right']) => {
    const row = Math.floor(position / 8);
    const col = position % 8;
    const possibleMoves = [];
    const directionOffsets = {
        'up-left': [-1, -1],
        'up-right': [-1, 1],
        'down-left': [1, -1],
        'down-right': [1, 1]
    };
  
    directions.forEach(direction => {
        const [rowOffset, colOffset] = directionOffsets[direction];
        for (let i = 1; i <= range; i++) {
            const newRow = row + i * rowOffset;
            const newCol = col + i * colOffset;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                break;
            }
            const index = newRow * 8 + newCol;
            const cellValue = board.cells[index].value
            // console.log("X", board.cells[index], " ",cellValue, board.cells[index].piece)
            if ( board.cells[index].piece === null) {
                possibleMoves.push(index);
                continue
            }
            const pieceLetter = board.cells[index].piece.abreviation ;
            // console.log(pieceLetter)
            const attackedPieceColor = pieceLetter.toLowerCase() === pieceLetter ? 'black' : 'white';
            console.log(attackedPieceColor, pieceColor)  
            if (attackedPieceColor !== pieceColor) {
                possibleMoves.push(index);
                break;
            } else {
                break;
            }
        }
    });
    console.log(possibleMoves)
    return possibleMoves;
  };
  
  export default diagonalMovesComponent;