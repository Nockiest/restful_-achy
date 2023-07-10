import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import calculateRookMoves from "./pieceMovements/rookMoveCalculator";
import calculateKnightMoves from "./pieceMovements/knightMoveCalculator";
import calculateKingMoves from "./pieceMovements/kingMoveCalculator";
import calculateQueenMoves from "./pieceMovements/queenMoveCalculator";
import calculateBishopMoves from "./pieceMovements/bishopMoveCalculator";
import calculatePawnMoves from "./pieceMovements/pawnMoveCalculator";
import { checkWhatGetsPlayerInCheck } from "./CheckCalculator";
import { pawnReachedBackRank, EvolvePawnPanel } from "./PawnEvolutionHandler";
import { determineMate } from "./MateCalculator";
import { determineDraw } from "./DrawCalculator";
import { pieceColor, findKings, checkEnPassantWasPlayed, calculatePossibleMoves, findIfCastled } from "../utils";
import PieceSelector from "./PieceSelector";
import InformationPanel from "./InformationPanel";
const Board = ({ height, width, curPlayer, setCurPlayer }) => {
  const [gameRepresentation, setGameRepresentation] = useState([
    ["", "", "", "", "K1", "", "", ""],
    ["", "", "P2", "", "", "", "", "p1"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "B1", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "P1", ""],
    ["", "", "", "", "k1", "", "", ""],
    // ["rl1", "", "", "", "k1", "", "", "rr2"],
    // ["q1", "", "", "", "", "", "", ""],
    // ["", "", "", "", "", "", "", ""],
    // ["", "", "", "", "", "", "", ""],
    // ["", "", "", "", "", "", "", ""],
    // ["", "p1", "", "Q1", "", "", "", ""],
    // ["", "", "", "", "", "", "", ""],
    // ["Rl1", "", "", "", "K1", "", "", "Rr2"],
  ]);
  const [enPassantPlayed, setEnpassantPlayed] = useState(false);
  const [playerCastled, setPlayerCastled] = useState(false);
  const [inCheck, setInCheck] = useState(false);
  const [illegalMoves, setIllegalMoves] = useState(false);
  const [selectedCell, setSelectedCell] = useState({
    id: null,
    piece: null,
    curPlayer: curPlayer,
  });
  const [movedPieces, setMovedPieces] = useState({});
  const [capturedPieces, setCapturedPieces] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [pawnToEvolveIndex, setPawnToEvolveIndex] = useState(null);
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

    //***   Player deselcted piece  */
    if (selectedCell.id === clickPos) {
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);
      return;
    }

    // ******* Check if it's the second click on a valid move
    if (selectedCell.id !== null && possibleMoves.includes(clickPos)) {
      processMovement(selectedCell.id, clickPos, selectedCell.piece, piece);
     
      setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
      setPossibleMoves([]);
      return;  
    }

    //check if players piece was selected
    const pieceColor = piece.toLowerCase() === piece ? "black" : "white";
    if (pieceColor !== curPlayer) return;

    //select the piece
    processPieceSelection(clickPos, piece, curPlayer);

    // find forbidden moves for the curPlayer
    const forbiddenMovement = checkWhatGetsPlayerInCheck(
      gameRepresentation,
      curPlayer,
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

    console.log(forbiddenMovement);
    if (forbiddenMovement.includes("king stands in check now")) {
      setInCheck((prevCheck) => {
        console.log("prevCheck:", prevCheck); // Updated value
        return true;
      });

      const canEscape = determineMate(gameRepresentation, curPlayer, gameHistory, movedPieces, inCheck);
      console.log("canEscape: ", canEscape);
    } else {
      setInCheck(false);
      const isDraw = determineDraw(gameRepresentation, curPlayer, gameHistory, movedPieces, inCheck);
      console.log("can he move something? ", isDraw);
    }
  };

  const processMovement = (selectedId, id, selectedPiece, piece) => {
    let capturedPiece = gameRepresentation[Math.floor(id / 8)][id % 8];
    const moveDetails = {
      color: curPlayer,
      piece: selectedPiece,
      from: selectedId,
      to: id,
      captured: capturedPiece,
    };

    const updatedGameHistory = [...gameHistory, moveDetails];
    setGameHistory(updatedGameHistory);
    console.log(selectedId, id, selectedPiece, piece, selectedPiece.toLowerCase());

    setGameRepresentation((prevGameRepresentation) => {
      let updatedGameRepresentation = [...prevGameRepresentation];
      updatedGameRepresentation = findIfCastled(gameRepresentation, curPlayer, selectedId, id, selectedPiece);
      updatedGameRepresentation[Math.floor(selectedId / 8)][selectedId % 8] = "";
      updatedGameRepresentation[Math.floor(id / 8)][id % 8] = selectedPiece;
      return updatedGameRepresentation;
    });
    setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

    let capturedByEnPassant = checkEnPassantWasPlayed(curPlayer === "white" ? "white" : "black", lastTurn, moveDetails);

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

    const bankRankPawnIndex = pawnReachedBackRank(gameRepresentation);
    console.log(bankRankPawnIndex);
    setPawnToEvolveIndex((prev) => {
      prev = bankRankPawnIndex;
      console.log(prev);
      return prev;
    });
    setPossibleMoves([]);
    setCurPlayer(curPlayer === "white" ? "black" : "white");
    setSelectedCell((prevstate) => ({ ...prevstate, id: null, piece: null }));
  };

  const processPieceSelection = (id, piece, curPlayer) => {
    setSelectedCell((prevstate) => ({
      ...prevstate,
      id,
      piece,
      curPlayer,
    }));
    const moves = calculatePossibleMoves(id, piece, gameRepresentation, gameHistory, movedPieces, inCheck);
    setPossibleMoves(moves);
  };

  useEffect(() => {
    const bankRankPawnIndex = pawnReachedBackRank(gameRepresentation);
    console.log(bankRankPawnIndex);
    setPawnToEvolveIndex((prev) => {
      prev = bankRankPawnIndex;
      console.log(prev);
      return prev;
    });
  }, [gameRepresentation, processGameMove]);

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
        <InformationPanel
          selectedCell={selectedCell}
          curPlayer={curPlayer}
          inCheck={inCheck}
          gameHistory={gameHistory}
        />
      </div>
      <EvolvePawnPanel
        pawnToEvolveIndex={pawnToEvolveIndex}
        gameRepresentation={gameRepresentation}
        curPlayer={curPlayer}
        setGameHistory={setGameRepresentation}
      />
    </div>
  );
};

export default Board;
