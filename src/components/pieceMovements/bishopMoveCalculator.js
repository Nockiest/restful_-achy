const calculateBishopMoves = (position, pieceColor , board) => {
    const row = Math.floor(position / 8);
    const col = position % 8;
    const possibleMoves = [];
  
     
    // Check moves in diagonal direction (up-left)
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      const index = i * 8 + j;
      const piece = board[index];
   const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== pieceColor) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in diagonal direction (up-right)
    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
      const index = i * 8 + j;
      const piece = board[index];
   const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== pieceColor) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in diagonal direction (down-left)
    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
      const index = i * 8 + j;
      const piece = board[index];
   const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== pieceColor) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in diagonal direction (down-right)
    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
      const index = i * 8 + j;
      const piece = board[index];
   const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== pieceColor) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    return possibleMoves;
  };

  export default calculateBishopMoves