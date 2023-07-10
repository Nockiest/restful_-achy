const calculatePawnMoves = (position, pieceColor, board, lastTurn) => {
  
  const row = Math.floor(position / 8);
  const col = position % 8;
  const possibleMoves = [];

  // First move calculation
  const firstMove = isFirstMove(row, pieceColor);
  if (firstMove) {
    const forwardOne = pieceColor === "white" ? position - 8 : position + 8;
    const forwardTwo = pieceColor === "white" ? position - 16 : position + 16;
    
    if (isEmptySquare(forwardOne, board)) {
      possibleMoves.push(forwardOne);
    }
    if (isEmptySquare(forwardOne, board) && isEmptySquare(forwardTwo, board)) {
      possibleMoves.push(forwardTwo);
    }
  }

  // Normal move calculation
  const forwardOne = pieceColor === "white" ? position - 8 : position + 8;
  if (isEmptySquare(forwardOne, board)) {
    possibleMoves.push(forwardOne);
  }

  // Capture calculation
  const captureLeft = pieceColor === "white" ? position - 9 : position + 9;
  const captureRight = pieceColor === "white" ? position - 7 : position + 7;
  // console.log(captureLeft,captureRight)
  if (isCapturePossible(captureLeft, pieceColor, board, position)) {
    possibleMoves.push(captureLeft);
  }
  if (isCapturePossible(captureRight, pieceColor, board, position)) {
    possibleMoves.push(captureRight);
  }

  // En passant calculation
  const enPassantLeft = pieceColor === "white" ? position - 9 : position + 9;
  const enPassantLeftCapture = pieceColor === "white" ? position - 1 : position + 1;
  const enPassantRight = pieceColor === "white" ? position - 7 : position + 7;
  const enPassantRightCapture = pieceColor === "white" ? position + 1 : position - 1;
  if (isEnPassantPossible(enPassantLeft, enPassantLeftCapture, pieceColor, board, lastTurn)) {
    possibleMoves.push(enPassantLeft);
  }
  if (isEnPassantPossible(enPassantRight, enPassantRightCapture, pieceColor, board,lastTurn )) {
    possibleMoves.push(enPassantRight);
  }

  return possibleMoves;
};

  // Helper functions
  const isFirstMove = (row, pieceColor) => {
    return (pieceColor === "white" && row === 6) || (pieceColor === "black" && row === 1);
  };
  
  const isEmptySquare = (position, board) => {
  // console.log(position, board[position] === "")
    return board[position] === "";
  };
  
  const isCapturePossible = (position, pieceColor, board, curPosition) => {
    if (position >= 0 && position < 64) {
      const piece = board[position];
      const attackedPieceColor = piece.toLowerCase() === piece ? 'black' : 'white';
      const currentRow = Math.floor(curPosition / 8);
      const newPositionRow = Math.floor((position  ) / 8);
    //  console.log(newPositionRow, currentRow, position)
     
        // Move within the same row, so it's a legal move
        return piece !== "" && attackedPieceColor !== pieceColor && Math.abs(currentRow - newPositionRow)=== 1;
        // attacked place not empty, it is an enemy, the pawn move only by one row
      
    }
    
    return false;
  };
  const isEnPassantPossible = (enPassantTo, enPassantCapture, pieceColor, board, lastTurn) => {
    if (enPassantTo >= 0 && enPassantTo < 64 && lastTurn) {
      
      const piece = board[enPassantTo];
      const lastPiece = lastTurn.piece;
      const lastFrom = lastTurn.from;
      const lastTo = lastTurn.to;
      const attackedPiecColor = piece.toLowerCase() === piece ? 'black' : 'white';
      // console.log(piece === "", attackedPiecColor, pieceColor)
      if (piece === "" && attackedPiecColor !== pieceColor, board[enPassantCapture]) {
        // console.log( lastFrom , enPassantTo +8, enPassantCapture )
        // console.log(lastPiece === "p" ,pieceColor === "white" ,lastFrom === enPassantTo + 8 ,lastTo === enPassantCapture  )
        // console.log(lastPiece === "P" ,pieceColor === "black" , lastFrom === enPassantTo - 8,lastTo === enPassantCapture )
        if (lastPiece === "P" && pieceColor === "black" && lastFrom === enPassantTo + 8 && lastTo === enPassantCapture  ) {
          // En passant is possible for black pawn moving 2 squares forward
          return true;
        } else if (lastPiece === "p" && pieceColor === "white" && lastFrom === enPassantTo - 8 && lastTo === enPassantCapture  ) {
          // En passant is possible for white pawn moving 2 squares forward
          return true;
        }
      }
    }
  
    return false;
  };
  // toto se bude měnitpokud obrátím desku
  export default calculatePawnMoves