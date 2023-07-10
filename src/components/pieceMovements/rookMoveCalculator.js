function calculateRookMoves(position, color,  board) {
    const row = Math.floor(position / 8);
    const col = position % 8;
    const possibleMoves = [];
    const movedPieceName = board[position]
  
    // Check moves in horizontal direction (left)
    for (let i = col - 1; i >= 0; i--) {
      const index = row * 8 + i;
      const piece = board[index];
      
      const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== color) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in horizontal direction (right)
    for (let i = col + 1; i < 8; i++) {
      const index = row * 8 + i;
      const piece = board[index];
      const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== color) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in vertical direction (up)
    for (let i = row - 1; i >= 0; i--) {
      const index = i * 8 + col;
      const piece = board[index];
       const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
     
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== color) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    // Check moves in vertical direction (down)
    for (let i = row + 1; i < 8; i++) {
      const index = i * 8 + col;
      const piece = board[index];
     const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';//  console.log(pieceColor ,color);
      if (piece === "") {
        possibleMoves.push(index);
      } else if (attackedPiecColor !== color) {
        possibleMoves.push(index);
        break;
      } else {
        break;
      }
    }
  
    return possibleMoves;
  }
  

  export default calculateRookMoves