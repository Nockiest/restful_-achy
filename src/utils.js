
import calculateRookMoves from "./components/pieceMovements/rookMoveCalculator"
import calculateKnightMoves from './components/pieceMovements/knightMoveCalculator';
import calculateKingMoves from './components/pieceMovements/kingMoveCalculator';
import calculateQueenMoves from './components/pieceMovements/queenMoveCalculator';
import calculateBishopMoves from './components/pieceMovements/bishopMoveCalculator';
import calculatePawnMoves from "./components/pieceMovements/pawnMoveCalculator";


export const pieceColor = (piece) => {
  if (piece === '' || piece == undefined) {
    return null;
  }
 
  return piece.toLowerCase() === piece ? 'black' : 'white';
};

export const findKings = (gameRepresentation) => {
  let gameFlat = gameRepresentation.flat();
  let whiteKingPosition = null;
  let blackKingPosition = null;

  for (let index = 0; index < gameFlat.length; index++) {
    const piece = gameFlat[index];

    if (piece && piece[0] === 'K') {
      whiteKingPosition = index;
    } else if (piece && piece[0] === 'k') {
      blackKingPosition = index;
    }
  }

  return { white: whiteKingPosition, black: blackKingPosition };
};


  export function checkEnPassantWasPlayed( playerColor, lastTurn, thisTurn){
    console.log(playerColor, lastTurn, thisTurn)
    if(!lastTurn|| lastTurn.length === 0){return  false}
      console.log("D1", lastTurn.piece[0].toLowerCase())
    if(lastTurn.piece[0].toLowerCase() !== "p"){return false}
    console.log("D2",lastTurn.captured )
    if (lastTurn.captured !== ""){ return false }
    console.log("D3", Math.abs(lastTurn.from - lastTurn.to))
    if(Math.abs(lastTurn.from - lastTurn.to) !== 16){return false}
      console.log("D4",Math.abs(thisTurn.from - thisTurn.to))
    if(Math.abs(thisTurn.from - thisTurn.to) !== 9 && Math.abs(thisTurn.from - thisTurn.to) !== 7 ) {return false }
      console.log("D5", thisTurn.piece[0].toLowerCase())
    if(thisTurn.piece[0].toLowerCase() !== "p"){return false}
    console.log("passed")
    let capturedPiecePos = playerColor === "white" ? lastTurn.from + 16 : lastTurn.from -16
    let isAcrossEdge = Math.floor(lastTurn.from / 8) !== Math.floor(capturedPiecePos / 8);
    console.log(isAcrossEdge)
    if (isAcrossEdge) {
      
      return false;
    }
    
    console.log("ENPASSANR CAPTURED PUECE IS " + capturedPiecePos)
    return capturedPiecePos
  
  };
  export const calculatePossibleMoves = (position, piece, gameRep, gameHistory,movedPieces,inCheck) => {
     
    const pieceColor = piece.charAt(0).toLowerCase() === piece.charAt(0) ? 'black' : 'white';
    const lastTurn = gameHistory?.[gameHistory.length - 1] || null;
    const firstLetter = piece.charAt(0).toLowerCase();
    // const isCheckLocal = inCheck || false
    
    switch (firstLetter) {
      case 'r':
        return calculateRookMoves(position, pieceColor, gameRep.flat(), gameHistory, movedPieces);
      case 'n':
        return calculateKnightMoves(position, pieceColor, gameRep.flat(), gameHistory, movedPieces);
      case 'k':
        return calculateKingMoves(position, pieceColor, gameRep.flat(), gameHistory, movedPieces,inCheck);
      case 'q':
        return calculateQueenMoves(position, pieceColor, gameRep.flat(), gameHistory, movedPieces);
      case 'b':
        return calculateBishopMoves(position, pieceColor, gameRep.flat(), gameHistory, movedPieces);
      case 'p':
        return calculatePawnMoves(position, pieceColor, gameRep.flat(), lastTurn, movedPieces);
      default:
        return [];
    }
  };

export const findIfCastled = (   selectedId, id, selectedPiece) => {
  if (selectedPiece.toLowerCase() === "k1") {
    if (Math.abs(selectedId - id) !== 2) {
      return false
    }  else {
      return true
    }
}
}

  export const renderCastle = (gameRepresentation, currentPlayer, selectedId, id, selectedPiece) => {
    if (selectedPiece.toLowerCase() === "k1") {
      if (Math.abs(selectedId - id) !== 2) {
        console.log("didn't castle");
      } else {
        console.log("castles");
        const kingStartPosition = currentPlayer === 'white' ? 60 : 4;
        const rookStartPosition = id > selectedId ? kingStartPosition + 3 : kingStartPosition - 4;
        const rookFinalPosition = id > selectedId ? kingStartPosition + 1 : kingStartPosition - 1;
        
        const updatedGameRepresentation = [...gameRepresentation];
        updatedGameRepresentation[Math.floor(rookStartPosition / 8)][rookStartPosition % 8] = "";
        updatedGameRepresentation[Math.floor(rookFinalPosition / 8)][rookFinalPosition % 8] = pieceColor(selectedPiece) === "white" ?  id > selectedId? "Rr2" : "Rl2":id > selectedId? "rr1":"rl1";
        // here i am hardcoding the number of the rook to one, technically a mistake
        return updatedGameRepresentation;
      }
    }
    
    return gameRepresentation;
  };

  export const getCellsInBetween = (start, end, board) => {
  let result = [];
  let step = start <= end ? 1 : -1; // determine the direction to iterate
  let smallerIndex = start <= end ? start : end
  let higherIndex = start <= end ? end : start
  for (let i =smallerIndex +1;  i < higherIndex; i ++) {
    result.push(board[i]);
  }// tahle finkce nepodporuje dummyBoard 
  return result;
};

export function isEqual(obj1, obj2) {
  // Check if both objects are objects and not null
  
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  // Get the keys of obj1 and obj2
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  // console.log(keys1.length ,keys2.length)
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if the values of each key are equal
  for (let key of keys1) {
    
    if (obj1[key] !== obj2[key]) {
      // console.log("isnt equall" ,obj1[key], obj2[key], obj1[key] === obj2[key], obj1[key] ===undefined, obj1[key] ===null, obj1[key] === isNaN( obj1[key] )  )
      return false;
    }
  }
 
  // Objects are equal
  return true;
}

export const getPieceImage = (piece, imageObj) => {
 
  try {
    if (piece === "" || piece === undefined || piece === null) {
      return;
    }

    const letter = piece[0].toLowerCase();
    const matchingPiece = Object.values(imageObj).find((pieceObj) => {
      return pieceObj.firstLetter.toLowerCase() === letter;
    });

    if (!matchingPiece) {
      return;
    }
   return matchingPiece[piece.toLowerCase() === piece ? "black" : "white"]
    
  } catch (error) {
    console.log(error);
  }

}

  //  
 // const simulateMove = (gameRepresentation, from, to, piece, player) => {
  //   const clonedGameRepresentation = JSON.parse(
  //     JSON.stringify(gameRepresentation.flat())
  //   );
  //   clonedGameRepresentation[to] = piece;
  //   clonedGameRepresentation[from] = "";
  //   const lookedForKing = player === "black" ? "k" : "K";
  //   const kingPosition = clonedGameRepresentation.find(
  //     (piece) => piece == lookedForKing
  //   );
  //   return checkKingInCheck(kingPosition, clonedGameRepresentation);
  // };



  // function checkIfPlayerCasteled(){
  //   let lastTurn = gameInformation.gameHistory[gameInformation.gameHistory.length-1];
  //   let piece = lastTurn.movedPiece
  //   if(piece === "king"){
  //     if(lastTurn.from - lastTurn.to === 2){
  //        return "left"
  //     } else if(lastTurn.from - lastTurn.to === -2){
  //       return "right"
  //     } else { 
  //       return false
  //     }
  //   }
  // } 

  // function determineMatePosition(curPlayer,call){
  //   let isCheck = isKingInCheck(reversePlayer(curPlayer),  gameInformation.gameRepresentation)   
  //   console.log(isCheck, call)
  //  if(!isCheck[reversePlayer(curPlayer)]){return}
  //     let savingMoves = [];
  //     savingMoves = checkForSavingMoves(curPlayer, gameInformation.gameRepresentation)
  //        if (savingMoves.length >= 1) {
  //        showMessage(reversePlayer(curPlayer), 1500, "CHECK");
  //      } else {
  //        showMessage(reversePlayer(curPlayer), 5000, `${curPlayer} won`);
  //        clearInterval(timeCounter)
  //      }  
  //  }

  //  function calculateEnpassant(index, color){
  //   let pieceLeftOfPawn = board[index - 1];
  //   let pieceRightOfPawn = board[index + 1];
  //   let lastTurn = gameInformation.gameHistory[gameInformation.gameHistory.length-1];
  //   if(!lastTurn){return false}
  //   if(index ===0||index ===63){return}
  //   if(isPawn(pieceLeftOfPawn) && isOnFifthRow(index - 1, color)) {
  //     if(lastTurn.movedPiece === "pawn" && Math.abs(lastTurn.from - lastTurn.to) === 16 && Number(lastTurn.to) === Number(index - 1)){    
  //       if(color === "black"){
  //         possibleMoves.push(Number(index) + moves[color].captureLeft);
  //       } else {
  //         possibleMoves.push(index + moves[color].captureRight);
  //       }
  //     }                   
  //   }

  //   if(isPawn(pieceRightOfPawn) && isOnFifthRow(index + 1, color)){                  
  //     if(lastTurn.movedPiece === "pawn" && Math.abs(lastTurn.from - lastTurn.to) === 16 && Number(lastTurn.to) === Number(index + 1)){
  //       if(color === "black"){
  //         possibleMoves.push(index + moves[color].captureRight);

  //       } else {
  //         possibleMoves.push(index + moves[color].captureLeft);
  //       }
  //     }
  //   } 
  // }
