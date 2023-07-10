import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import calculateRookMoves from "./pieceMovements/rookMoveCalculator";
import calculateKnightMoves from "./pieceMovements/knightMoveCalculator";
import calculateKingMoves from "./pieceMovements/kingMoveCalculator";
import calculateQueenMoves from "./pieceMovements/queenMoveCalculator";
import calculateBishopMoves from "./pieceMovements/bishopMoveCalculator";
import calculatePawnMoves from "./pieceMovements/pawnMoveCalculator";
import { checkWhatGetsPlayerInCheck } from "./CheckCalculator";
import { determineMate } from "./MateCalculator";
import { determineDraw } from "./DrawCalculator";
import {
  pieceColor,
  findKings,
  checkEnPassantWasPlayed,
  calculatePossibleMoves,
  findIfCastled
} from "../utils";
const Board = ({ height, width, currentPlayer, setCurrentPlayer }) => {
    const [gameRepresentation, setGameRepresentation] = useState([
      // ["r", "n", "b", "q", "k", "b", "n", "r"],
      // ["p", "q", "p", "p", "p", "p", "p", "p"],
      // ["", "", "", "", "", "", "", ""],
      // ["", "", "", "", "", "", "", ""],
      // ["", "", "", "", "", "", "", ""],
      // ["", "", "", "", "", "", "", ""],
      // ["P", "P", "P", "P", "P", "P", "P", "P"],
      // ["R", "N", "B", "Q", "K", "B", "N", "R"],
      ["rl1", "", "", "", "k1", "", "", "rr2"],
      ["q1", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "p1", "", "Q1", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Rl1", "", "", "", "K1", "", "", "Rr2"],
    ]);
    const [enPassantPlayed, setEnpassantPlayed] = useState(false);
    const [playerCastled, setPlayerCastled] = useState(false);
    const [inCheck, setInCheck] = useState(false);
    const [illegalMoves, setIllegalMoves] = useState(false);

    const [selectedCell, setSelectedCell] = useState({
      id: null,
      piece: null,
      currentPlayer: currentPlayer,
    });

    const [movedPieces, setMovedPieces] = useState({});
    const [capturedPieces, setCapturedPieces] = useState([]);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [gameHistory, setGameHistory] = useState([]);
    const lastTurn = gameHistory[gameHistory.length - 1];

  const initializeMovedPieces = () => {
    const pieces = gameRepresentation.flat().filter((piece) => piece !== "");
    const newMovedPieces = {};

    pieces.forEach((piece) => {
      newMovedPieces[piece] = false;
    });

    setMovedPieces(newMovedPieces);
  };
    useEffect(() => {
      initializeMovedPieces();
    }, []);

  const processGameMove = (clickPos, piece) => {
   
    // Player deselcted piece
    if (selectedCell.id === clickPos) {
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);
      return;
    }

    // Check if it's the second click on a valid move
    if (selectedCell.id !== null && possibleMoves.includes(clickPos)) {
      processMovement(selectedCell.id, clickPos, selectedCell.piece, piece);
      // Unselect the piece
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);

      return; // Do nothing
    }

    //check if players piece was selected
    const pieceColor = piece.toLowerCase() === piece ? "black" : "white";
    if (pieceColor !== currentPlayer) return;

    processPieceSelection(clickPos, piece, currentPlayer);
 
    const forbiddenMovement = checkWhatGetsPlayerInCheck(
      gameRepresentation,
      currentPlayer,
      gameHistory,
      movedPieces,
      inCheck
    );
   
    setIllegalMoves(forbiddenMovement);

    // Find the selected piece in the movedPieces array and set its value to true
    console.log("moved piece is: ", piece);
    setMovedPieces((prevState) => ({
      ...prevState,
      [piece]: true,
    }));

  //   console.log("Moved Pieces: ", movedPieces);
console.log(forbiddenMovement)
    if (forbiddenMovement.includes("king stands in check now")) {
     
      setInCheck(prevCheck => {
        console.log("prevCheck:", prevCheck); // Updated value
        return true;
      });
    
      const canEscape = determineMate(
        gameRepresentation,
        currentPlayer,
        gameHistory,
        movedPieces,
        inCheck
      );
      console.log("canEscape: ", canEscape);
    } else {
      setInCheck(false);
      const isDraw = determineDraw(
        gameRepresentation,
        currentPlayer,
        gameHistory,
        movedPieces,
        inCheck
      );
      console.log("can he move something? ", isDraw);
    }
  };

  const processMovement = (selectedId, id, selectedPiece, piece) => {
    let capturedPiece = gameRepresentation[Math.floor(id / 8)][id % 8];
    const moveDetails = {
      color: currentPlayer,
      piece: selectedPiece,
      from: selectedId,
      to: id,
      captured: capturedPiece,
    };

    const updatedGameHistory = [...gameHistory, moveDetails];
    setGameHistory(updatedGameHistory);
    console.log(selectedId, id, selectedPiece, piece,selectedPiece.toLowerCase())
    
    // if (selectedPiece.toLowerCase() === "k1") {
    //   if (Math.abs(selectedId - id) !== 2) {
    //     console.log("didn't castle");
    //   } else {
    //     console.log("castles");
    //     const kingStartPosition = currentPlayer === 'white' ? 60 : 4;
    //     const rookStartPosition = id > selectedId ? kingStartPosition + 3 : kingStartPosition - 4;
    //     const rookFinalPosition = id > selectedId ? kingStartPosition + 1 : kingStartPosition - 1;
    //     console.log(rookStartPosition,rookFinalPosition)
    //     setGameRepresentation((prevGameRepresentation) => {
    //       const updatedGameRepresentation = [...prevGameRepresentation];

    //       updatedGameRepresentation[Math.floor(rookStartPosition / 8)][rookStartPosition % 8] = "";
    //       updatedGameRepresentation[Math.floor(rookFinalPosition / 8)][rookFinalPosition % 8] = pieceColor(selectedPiece) === "white" ? "Rr2" : "Rl2";
    //       return updatedGameRepresentation;
    //     });
    //   }
    // }
    // console.log(selectedId, id, selectedPiece, piece);
    setGameRepresentation((prevGameRepresentation) => {
      let updatedGameRepresentation = [...prevGameRepresentation];
      updatedGameRepresentation = findIfCastled(gameRepresentation, currentPlayer, selectedId, id, selectedPiece)
      updatedGameRepresentation[Math.floor(selectedId / 8)][selectedId % 8] =
        "";
      updatedGameRepresentation[Math.floor(id / 8)][id % 8] = selectedPiece;
      return updatedGameRepresentation;
    });
    setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

    

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
      gameHistory,
      movedPieces,
      inCheck
    );
    setPossibleMoves(moves);
  };

 
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
        <p> playerInCheck?: {inCheck === true ? "true" : "false"}</p>
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
