import { isKingInCheck } from "../CheckCalculator"; 
import { pieceColor, getCellsInBetween } from "../../utils";
 
function calculateKingMoves(position, color, board, gameHistory, movedPieces,inCheck) {
    const row = Math.floor(position / 8);
    const col = position % 8;
    const possibleMoves = [];
  
    const offsets = [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ];
  
    for (const offset of offsets) {
      const newRow = row + offset.row;
      const newCol = col + offset.col;
  
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const index = newRow * 8 + newCol;
        const piece = board[index];
        const attackedPieceColor =piece.toLowerCase() === piece ? "black" : "white";
        // Check if the target cell is empty or contains an opponent's piece
        
        if (piece === "" ||  attackedPieceColor !== color) {
          possibleMoves.push(index);
        }
      }
    }
  const canCastleLeft = tryCastle(board, color, "kingside", gameHistory,movedPieces,inCheck)
  const canCastleRight = tryCastle(board, color, "queenside", gameHistory, movedPieces,inCheck)
   canCastleLeft && possibleMoves.push( canCastleLeft) 
   canCastleRight && possibleMoves.push( canCastleRight) 
  
    return possibleMoves;
  }

  export default calculateKingMoves
  
  const tryCastle = (board, currentPlayer, side, gameHistory, movedPieces,inCheck) => {
    board.flat();
   
    if(inCheck){return}
    // Determine the relevant squares based on the side parameter
    const kingStartPosition = currentPlayer === 'white' ?  60 : 4  ;
    const kingFinalPosition = side === 'kingside' ? kingStartPosition + 2 : kingStartPosition - 2;
    const rookStartPosition = side === 'kingside' ? kingStartPosition + 3 : kingStartPosition - 4;
    const rookFinalPosition = side === 'kingside' ? kingStartPosition - 1 : kingStartPosition + 1;
  
    // Check if the king and rook meet the conditions for a valid castle move
    const cellsInBetween = getCellsInBetween(kingStartPosition, rookStartPosition, board)
    const isEmptyString = (value) => value === '';

    const isEveryFieldEmptyString = cellsInBetween.every(isEmptyString);
      
    
    // const fieldsBetweenEmpty = side === 'kingside'
    //   ? board[rookStartPosition - 1] === '' && board[rookStartPosition - 2] === ''
    //   : board[rookStartPosition + 1] === '' && board[rookStartPosition + 2] === '' && board[rookStartPosition + 3] === '';
    // if (!fieldsBetweenEmpty){return false}
      // console.trace(currentPlayer,board, rookStartPosition, board[rookStartPosition - 1]   , board[rookStartPosition - 2], side, fieldsBetweenEmpty)
    const rookPiece = board[rookStartPosition].slice(0, 2);
    const rookColor = pieceColor(rookPiece)
    const isRookOnStartingPosition = side === 'kingside' ? rookPiece.toLowerCase() === 'rr' : rookPiece.toLowerCase() === 'rl';
    // console.log(rookColor,isRookOnStartingPosition, fieldsBetweenEmpty  )
  
    // Check if the king and rook have not moved previously
    const kingMoved = movedPieces[currentPlayer === 'white' ? 'K1' : 'k1'];
    const rookMoved = movedPieces[side === 'kingside' ? (currentPlayer === 'white' ? 'Rr2' : 'rr2') : (currentPlayer === 'white' ? 'Rl2' : 'rl2')];
    console.log(isEveryFieldEmptyString, cellsInBetween, isRookOnStartingPosition, kingMoved, rookMoved)
    
    if (kingMoved || rookMoved) {
      return false;
    }
    if (!isRookOnStartingPosition){ return false}
    if(!isEveryFieldEmptyString){ return console.log("its false")}
// console.log(kingFinalPosition)
    return kingFinalPosition
    // Check if the king is not in check
   
    // Check if the squares the king passes over and the final square are not under attack
  
    // If all conditions are satisfied, update the game representation and move the king and rook
  
    // Otherwise, handle any error or display a message indicating an invalid castle move

       // Output the results
    //  console.log(movedPieces, ": these are movedPieces")
    //  console.log(`Fields between rook and king are empty: ${fieldsBetweenEmpty}`);
    //  console.log(`Rook is on starting position: ${isRookOnStartingPosition}`);
  };