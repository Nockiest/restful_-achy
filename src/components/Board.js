import React, { useState } from "react";
import Cell from "./Cell";
import calculateRookMoves from "./pieceMovements/rookMoveCalculator";
import calculateKnightMoves from "./pieceMovements/knightMoveCalculator";
import calculateKingMoves from "./pieceMovements/kingMoveCalculator";
import calculateQueenMoves from "./pieceMovements/queenMoveCalculator";
import calculateBishopMoves from "./pieceMovements/bishopMoveCalculator";
import calculatePawnMoves from "./pieceMovements/pawnMoveCalculator";
import { checkWhatGetsPlayerInCheck } from "./CheckCalculator";
import {
  pieceColor,
  findKings,
  checkEnPassantWasPlayed,
  calculatePossibleMoves,
} from "../utils";
const Board = ({ height, width, currentPlayer, setCurrentPlayer }) => {
  const [gameRepresentation, setGameRepresentation] = useState([
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "q", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["K", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", " ", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "", "B", "N", "R"],
  ]);
  const [enPassantPlayed, setEnpassantPlayed] = useState(false);
  const [playerCastled, setPlayerCastled] = useState(false);

  const [selectedCell, setSelectedCell] = useState({
    id: null,
    piece: null,
    currentPlayer: currentPlayer,
  });

  const [capturedPieces, setCapturedPieces] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [whoIsChecked, setWhoIsChecked] = useState({
    white: false,
    black: false,
  });
  const [gameHistory, setGameHistory] = useState([]);
  const lastTurn = gameHistory[gameHistory.length - 1];

  const processGameMove = (clickPos, piece) => {
    console.log(clickPos, piece);

    // Player deselcted piece
    if (selectedCell.id === clickPos) {
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);
      return;
    }
    console.log(selectedCell.id !== null && possibleMoves.includes(clickPos));
    // Check if it's the second click on a valid move
    if (selectedCell.id !== null && possibleMoves.includes(clickPos)) {
      processMovement(selectedCell.id, clickPos, selectedCell.piece, piece);
      // Unselect the piece
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);
      return; // Do nothing
    }

    const pieceColor = piece.toLowerCase() === piece ? "black" : "white";
    if (pieceColor !== currentPlayer) return;

    // const kingsPositions = findKings(gameRepresentation);
    // const kingInCheck = checkKingsInCheck(kingsPositions, gameRepresentation, currentPlayer, gameHistory)
    // console.log(kingInCheck)
    processPieceSelection(clickPos, piece, currentPlayer);
    /////// checkWhatGetsPlayerInCheck(gameRepresentation,currentPlayer,gameHistory )
    
    // if (kingInCheck) {
    // console.log(kingInCheck)
    // let isAnyMovePossible = checkIfAnyMovePossible(currentPlayer, currentPlayer==="white"? kingsPositions.black:kingsPositions.white  );
    // if (!isAnyMovePossible) {
    //   alert('MATE!');
    // } else {console.log("only check")}
    // }
  };

  const processMovement = (selectedId, id, selectedPiece, piece) => {
    let capturedPiece = gameRepresentation[Math.floor(id / 8)][id % 8];
    console.log(selectedId, id, selectedPiece, piece);
    setGameRepresentation((prevGameRepresentation) => {
      const updatedGameRepresentation = [...prevGameRepresentation];
      updatedGameRepresentation[Math.floor(selectedId / 8)][selectedId % 8] =
        "";
      updatedGameRepresentation[Math.floor(id / 8)][id % 8] = selectedPiece;
      return updatedGameRepresentation;
    });
    setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

    const moveDetails = {
      color: currentPlayer,
      piece: selectedPiece,
      from: selectedId,
      to: id,
      captured: capturedPiece,
    };

    const updatedGameHistory = [...gameHistory, moveDetails];
    setGameHistory(updatedGameHistory);

    let capturedByEnPassant = checkEnPassantWasPlayed(
      currentPlayer === "white" ? "white" : "black",
      lastTurn,
      moveDetails
    );

    if (capturedByEnPassant) {
      const capturedPiece = gameRepresentation.flat()[capturedByEnPassant];

      setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

      setGameRepresentation((prevRepresentation) => {
        const flattenedRepresentation = prevRepresentation.flat();
        const newGamerep = [];

        for (let i = 0; i < flattenedRepresentation.length; i += 8) {
          const row = flattenedRepresentation.slice(i, i + 8);
          for (let j = 0; j < row.length; j++) {
            if (i + j === capturedByEnPassant) {
              newGamerep.push("");
            } else {
              newGamerep.push(row[j]);
            }
          }
        }

        const updatedRepresentation = [];
        for (let i = 0; i < newGamerep.length; i += 8) {
          updatedRepresentation.push(newGamerep.slice(i, i + 8));
        }

        return updatedRepresentation;
      });
    }
    setPossibleMoves([]);
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
    setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
  };

  const processPieceSelection = (id, piece, currentPlayer) => {
    setSelectedCell((prevstate) => ({
      ...prevstate,
      id,
      piece,
      currentPlayer,
    }));
    const moves = calculatePossibleMoves(
      id,
      piece,
      gameRepresentation,
      gameHistory
    );
    setPossibleMoves(moves);
  };

  // const isKingInCheck = (kingPosition, kingColor, gameRepresentation) => {
  //   const opponentColor = kingColor === "white" ? "black" : "white";
  //   const flattenedRepresentation = Array.isArray(gameRepresentation)
  //     ? gameRepresentation.flat()
  //     : gameRepresentation;

  //   for (let index = 0; index < flattenedRepresentation.length; index++) {
  //     const piece = flattenedRepresentation[index];

  //     if (piece === "") continue;

  //     if (pieceColor(piece) === opponentColor) {
  //       const piecePosition = index;
  //       const pieceMoves = calculatePossibleMoves(
  //         piecePosition,
  //         piece,
  //         gameRepresentation,
  //         gameHistory
  //       );
  //       console.log(index, pieceMoves);
  //       if (pieceMoves.includes(kingPosition)) {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // };

  // const checkIfAnyMovePossible = (kingColor, kingPosition) => {
  //   const opponentColor = kingColor === "white" ? "black" : "white";
  //   console.log(isKingInCheck(kingPosition, opponentColor, gameRepresentation));
  //   const playerPieces = gameRepresentation
  //     .flat()
  //     .filter((piece) => pieceColor(piece) === kingColor);
  //   console.log(playerPieces);
  //   // Iterate through all player's pieces and check their potential moves
  //   for (let i = 0; i < playerPieces.length; i++) {
  //     const playerPiecePosition = gameRepresentation
  //       .flat()
  //       .findIndex((piece) => piece === playerPieces[i]);
  //     const playerPiecePotentialMoves = calculatePossibleMoves(
  //       playerPiecePosition,
  //       playerPieces[i],
  //       gameRepresentation
  //     );
  //     console.log(playerPiecePotentialMoves);
  //     // Iterate through all potential moves of the player's piece
  //     for (let j = 0; j < playerPiecePotentialMoves.length; j++) {
  //       const potentialMove = playerPiecePotentialMoves[j];
  //       const clonedGameRepresentation = JSON.parse(
  //         JSON.stringify(gameRepresentation)
  //       );

  //       // Simulate the potential move
  //       clonedGameRepresentation[Math.floor(potentialMove / 8)][
  //         potentialMove % 8
  //       ] = playerPieces[i];
  //       clonedGameRepresentation[Math.floor(playerPiecePosition / 8)][
  //         playerPiecePosition % 8
  //       ] = "";
  //       clonedGameRepresentation[0][5] = "";
  //       console.log(clonedGameRepresentation);

  //       // Check if the move makes the king move out of check

  //       const newKingPosition =
  //         kingPosition === playerPiecePosition ? potentialMove : kingPosition;
  //       if (
  //         !isKingInCheck(
  //           newKingPosition,
  //           opponentColor,
  //           clonedGameRepresentation
  //         )
  //       ) {
  //         return true; // At least one move is possible
  //       }
  //     }
  //   }

  //   return false; // No move is possible
  // };

  // const checkKingInCheck = (
  //   kingsPosition,
  //   gameRepresentation,
  //   player,
  //   gameHistory
  // ) => {
  //   //  console.log(kingsPositions)
  //   const kingInCheck = isKingInCheck(
  //     kingsPosition.white,
  //     player,
  //     gameRepresentation,
  //     gameHistory
  //   );
  //   // const isBlackKingInCheck = isKingInCheck(kingsPositions.black, 'black',gameRepresentation);
  //   // console.log(isWhiteKingInCheck,isBlackKingInCheck)
  //   // setWhoIsChecked({white: isWhiteKingInCheck, black: isBlackKingInCheck })
  //   return kingInCheck;
  // };

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

  return (
    <div className="game-screen">
      <div id="table">
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
        <p>Current Player: {selectedCell.currentPlayer}</p>
        <p>Cur: player: {currentPlayer}</p>
        <p> capturedPiece: {capturedPieces}</p>
        <p> W: {whoIsChecked.white ? "true" : "false"} </p>
        <p> B: {whoIsChecked.black ? "true" : "false"}</p>
        <div>
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
