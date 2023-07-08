import React, {useState} from 'react';
import Cell from './Cell';
import calculateRookMoves from "./pieceMovements/rookMoveCalculator"
import calculateKnightMoves from './pieceMovements/knightMoveCalculator';
import calculateKingMoves from './pieceMovements/kingMoveCalculator';
import calculateQueenMoves from './pieceMovements/queenMoveCalculator';
import calculateBishopMoves from './pieceMovements/bishopMoveCalculator';
import calculatePawnMoves from "./pieceMovements/pawnMoveCalculator";
import { pieceColor, findKings, checkEnPassantWasPlayed } from '../utils';
const Board = ({ height, width,     currentPlayer, setCurrentPlayer }) => {
  const [gameRepresentation, setGameRepresentation] = useState([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', 'P', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'p', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);
  

  const [selectedCell, setSelectedCell] = useState({
    id: null,
    piece: null,
    isBlack: null,
    currentPlayer: currentPlayer,
  });

  const [capturedPieces, setCapturedPieces] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [whoIsChecked, setWhoIsChecked] = useState({white: false, black: false})
  const [gameHistory, setGameHistory] = useState([])
  const lastTurn = gameHistory[gameHistory.length - 1]

  const processGameMove = (clickPos, piece) => {
    console.log(gameHistory)
    const isBlack = piece === piece.toLowerCase();
    // Player deselcted piece
    if (selectedCell.id === clickPos) {  
     
      setSelectedCell({ id: null, piece: null, isBlack: null });
      setPossibleMoves([]);
      return
     }  

    // Check if it's the second click on a valid move
    if (selectedCell.id  !== null && possibleMoves.includes(clickPos)) {
      
      
        // Unselect the piece
        setSelectedCell({ id: null, piece: null, isBlack: null });
        setPossibleMoves([]);
       
     
  
      processMovement(selectedCell.id , clickPos, selectedCell.piece, piece);
      
      return; // Do nothing
    } 


      const pieceColor = piece.toLowerCase() === piece ? 'black' : 'white';
      if (pieceColor !== currentPlayer) return;
      const kingsPositions = findKings(gameRepresentation);
      const gameFlat = gameRepresentation.flat();
      processPieceSelection(clickPos, piece, isBlack, currentPlayer);
  
      // if (isKingInCheck) {
      //   // const isAnyMovePossible = checkIfAnyMovePossible(pieceColor, kingPosition);
      //   // if (!isAnyMovePossible) {
      //   //   alert('MATE!');
      //   // }
      // }
     
  };
  
  
 
  const processMovement = (selectedId, id, selectedPiece, piece) => {
    let capturedPiece = gameRepresentation[Math.floor(id / 8)][id % 8];  
   
   setGameRepresentation(prevGameRepresentation => {
      const updatedGameRepresentation = [...prevGameRepresentation];
      updatedGameRepresentation[Math.floor(selectedId / 8)][selectedId % 8] = '';
      updatedGameRepresentation[Math.floor(id / 8)][id % 8] = selectedPiece;
      return updatedGameRepresentation;
    });
    setCapturedPieces(prevPieces => [...prevPieces, capturedPiece]);
  
    const moveDetails = {
      color: currentPlayer,
      piece: selectedPiece,
      from: selectedId,
      to: id,
      captured: capturedPiece,
    };
 
    const updatedGameHistory = [...gameHistory, moveDetails];
    setGameHistory(updatedGameHistory);
 
    let capturedByEnPassant = checkEnPassantWasPlayed( currentPlayer === 'white' ? 'white' : 'black', lastTurn, moveDetails)
    // vymaž figurku lapenou v enpassant
    setPossibleMoves([]);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setSelectedCell({ id: null, piece: null, isBlack: null });
  };
  const processPieceSelection = (id, piece, isBlack, currentPlayer) => {
    setSelectedCell({ id, piece, isBlack, currentPlayer });
    const moves = calculatePossibleMoves(id, piece);
    setPossibleMoves(moves);
  };

  const calculatePossibleMoves = (id, piece) => {
    const position = gameRepresentation
      .flat()
      .findIndex((cellPiece, index) => index === id && cellPiece === piece);
    const pieceColor = piece.toLowerCase() === piece ? 'black' : 'white';
    const lastTurn = gameHistory[gameHistory.length-1]
    // console.log(lastTurn, gameHistory)
    if (piece.toLowerCase() === 'r') {
      return calculateRookMoves(id, pieceColor, gameRepresentation.flat());
    } else if (piece.toLowerCase() === 'n') {
      return calculateKnightMoves(id, pieceColor, gameRepresentation.flat());
    } else if (piece.toLowerCase() === 'k') {
      return calculateKingMoves(id, pieceColor, gameRepresentation.flat());
    } else if (piece.toLowerCase() === 'q') {
      return calculateQueenMoves(id, pieceColor, gameRepresentation.flat());
    } else if (piece.toLowerCase() === 'b') {
      return calculateBishopMoves(id, pieceColor, gameRepresentation.flat());
    } else if (piece.toLowerCase() === 'p') {
      return calculatePawnMoves(id, pieceColor, gameRepresentation.flat(), lastTurn);
    }

    return [];
  };
  
  const isKingInCheck = (kingPosition, kingColor) => {
    const opponentColor = kingColor === 'white' ? 'black' : 'white';
  
    for (let index = 0; index < gameRepresentation.flat().length; index++) {
      const piece = gameRepresentation.flat()[index];
   
      if (piece === "") continue;
    
      if (pieceColor(piece) === opponentColor) {
        const piecePosition = index;
        const pieceMoves = calculatePossibleMoves(piecePosition, piece);
    
        if (pieceMoves.includes(kingPosition)) {
          return true;
        }
      }
    }
  
    return false;
  };
    
      const checkKingsInCheck = (kingsPositions) => {
       
        const isWhiteKingInCheck = isKingInCheck(kingsPositions.white, 'white');
        const isBlackKingInCheck = isKingInCheck(kingsPositions.black, 'black');
 
        setWhoIsChecked({white: isWhiteKingInCheck, black: isBlackKingInCheck })
        return isWhiteKingInCheck || isBlackKingInCheck
      }

      const checkIfAnyMovePossible = (kingColor ,kingPosition) => {
        const opponentColor = kingColor === 'white' ? 'black' : 'white';
      
        // Get all opponent pieces
        const opponentPieces = gameRepresentation.flat().filter((piece) => pieceColor(piece) === opponentColor);
      
        // Iterate through all opponent pieces and check their possible moves
        for (let i = 0; i < opponentPieces.length; i++) {
          const opponentPiecePosition = gameRepresentation.flat().findIndex((piece) => piece === opponentPieces[i]);
          const opponentPieceMoves = calculatePossibleMoves(opponentPiecePosition, opponentPieces[i]);
      
          // Check if any of the opponent's piece moves can capture the king
          if (opponentPieceMoves.includes(kingPosition)) {
            return true; // At least one move is possible
          }
        }
      
        return false; // No move is possible
      };
    
    return (
      <div className='game-screen' >
        <div
          id="table"
        >
          {Array.from({ length: height }).map((_, i) =>
            Array.from({ length: width }).map((_, j) => {
              const index = i * width + j;
              const isGray = (i + j) % 2 === 1;
              const piece = gameRepresentation[i][j];
              const isSelected = selectedCell.id === index;
              const isHighlighted = possibleMoves.includes(index);
              return (
                <Cell
                  key={index}
                  id={index}
                  piece={piece}
                  isGray={isGray}
                  isSelected={isSelected}
                  isHighlighted={isHighlighted}
                  onClick={processGameMove}
                />
              );
            })
          )}
        </div>
        <div>
          <p>Selected Cell: {selectedCell.id}</p>
          <p>Selected Piece: {selectedCell.piece}</p>
          <p>Is Black: {selectedCell.isBlack ? 'Yes' : 'No'}</p>
          <p>Current Player: {selectedCell.currentPlayer}</p>
           <p>Cur: player: {currentPlayer}</p> 
           <p> capturedPiece: {capturedPieces}</p> 
           <p> W: {whoIsChecked.white? "true" : "false"} </p>
           <p> B: {whoIsChecked.black? "true" : "false"}</p>
           <div >
            {gameHistory.map((move, index) => (
              <div className="game-history-move" key={index}>
                <p>Color: {move.color}</p>
                <p>Piece: {move.piece}</p>
                <p>From: {move.from}</p>
                <p>To: {move.to}</p>
                <p>Captured: {move.captured}</p>
              </div>
            ))}
          </div>

        </div>
      
      </div>
    );
  };
  
  export default Board;