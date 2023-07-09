
import calculateRookMoves from "./components/pieceMovements/rookMoveCalculator"
import calculateKnightMoves from './components/pieceMovements/knightMoveCalculator';
import calculateKingMoves from './components/pieceMovements/kingMoveCalculator';
import calculateQueenMoves from './components/pieceMovements/queenMoveCalculator';
import calculateBishopMoves from './components/pieceMovements/bishopMoveCalculator';
import calculatePawnMoves from "./components/pieceMovements/pawnMoveCalculator";


export const pieceColor = (piece) => {
    return piece.toLowerCase() === piece ? 'black' : 'white';
  };

  export const findKings = (gameRepresentation) => {
    let gameFlat = gameRepresentation.flat()
    let whiteKingPosition = null;
    let blackKingPosition = null;
    for (let index = 0; index < gameFlat.length; index++) {
      const piece = gameFlat[index];
   
      if (piece === 'K') {
        whiteKingPosition = index;
      } else if (piece === 'k') {
        blackKingPosition = index;
      }
    }

    return {white: whiteKingPosition, black: blackKingPosition}

  }

  export function checkEnPassantWasPlayed( playerColor, lastTurn, thisTurn){
    // console.log(thisTurn)
    // if(!lastTurn){return}
    // console.log("D")
    // if(lastTurn.piece.toLowerCase() !== "p"){return}
    // console.log("D")
    // if (lastTurn.captured !== ""){ return }
    // console.log("D", Math.abs(lastTurn.from - lastTurn.to))
    // if(Math.abs(lastTurn.from - lastTurn.to) !== 16){return}
    // console.log("D")
    // if(Math.abs(thisTurn.from - thisTurn.to) !== 9 && Math.abs(thisTurn.from - thisTurn.to) !== 7 ) {return }
    // console.log("D5")
    // if(thisTurn.piece.toLowerCase() !== "p"){return}
    // let capturedPiecePos = playerColor === "white" ? lastTurn.from + 16 : lastTurn.from -16
    // console.log("ENPASSANR CAPTURED PUECE IS " + capturedPiecePos)
    // return capturedPiecePos
  return false
  };

  export const calculatePossibleMoves = (id, piece, gameRep, gameHistory) => {
     
    const position = gameRep
      .flat()
      .findIndex((cellPiece, index) => index === id && cellPiece === piece);
    const pieceColor = piece.toLowerCase() === piece ? "black" : "white";
    const lastTurn = gameHistory[gameHistory?.length - 1] || null;

    if (piece.toLowerCase() === "r") {
      return calculateRookMoves(id, pieceColor, gameRep.flat());
    } else if (piece.toLowerCase() === "n") {
      return calculateKnightMoves(id, pieceColor, gameRep.flat());
    } else if (piece.toLowerCase() === "k") {
      return calculateKingMoves(id, pieceColor, gameRep.flat());
    } else if (piece.toLowerCase() === "q") {
      return calculateQueenMoves(id, pieceColor, gameRep.flat());
    } else if (piece.toLowerCase() === "b") {
      return calculateBishopMoves(id, pieceColor, gameRep.flat());
    } else if (piece.toLowerCase() === "p") {
      return calculatePawnMoves(id, pieceColor, gameRep.flat(), lastTurn);
    }

    return [];
  };
  
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
