import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import calculateRookMoves from "./pieceMovements/rookMoveCalculator";
import calculateKnightMoves from "./pieceMovements/knightMoveCalculator";
import calculateKingMoves from "./pieceMovements/kingMoveCalculator";
import calculateQueenMoves from "./pieceMovements/queenMoveCalculator";
import calculateBishopMoves from "./pieceMovements/bishopMoveCalculator";
import calculatePawnMoves from "./pieceMovements/pawnMoveCalculator";
import { checkWhatGetsPlayerInCheck } from "./CheckCalculator";
import { pawnReachedBackRank, EvolvePawnPanel } from "./EvolvePawnHandler";
import { determineMate } from "./MateCalculator";
import { determineDraw } from "./DrawCalculator";
import { pieceColor, findKings, checkEnPassantWasPlayed, calculatePossibleMoves, findIfCastled } from "../utils";
import InformationPanel from "./InformationPanel";
const Board = ({ height, width, curPlayer, setCurPlayer }) => {
  const [gameRepresentation, setGameRepresentation] = useState([
    ["rl1", "n1", "b1", "q1", "k1", "b2", "n2", "rr2"],
    ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"],
    ["Rl1", "N1", "B1", "Q1", "K1", "B2", "N2", "Rr2"],

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
    curPlayer: null,
  });
  const [movedPieces, setMovedPieces] = useState({});
  const [capturedPieces, setCapturedPieces] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [pawnToEvolveIndex, setPawnToEvolveIndex] = useState(null);
  const [playedMoves, setPlayedMoves] = useState(0);
  const [playerChangeCount, setplayerChangeCount] = useState(0);
  const lastTurn = gameHistory[gameHistory.length - 1];

  const initializeMovedPieces = () => {
    const pieces = gameRepresentation.flat().filter((piece) => piece !== "");
    const newMovedPieces = {};

    pieces.forEach((piece) => {
      console.log(piece === "");
      return (newMovedPieces[piece] = false);
    });

    setMovedPieces(newMovedPieces);
  };
  useEffect(() => {
    initializeMovedPieces();
  }, []);

  const processGameMove = (clickPos, piece) => {
    // console.log(selectedCell,selectedCell.id === clickPos,selectedCell.id)
    //***   Player deselcted piece  by cclicking on a piece of the same color */
    if ( ( selectedCell.id !== null && pieceColor(piece) === curPlayer )) {
      setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
      setPossibleMoves([]);
      return;
    }

 
    // ******* Check if it's the second click on a valid move
    if (selectedCell.id !== null && possibleMoves.includes(clickPos)   ) {
      processMovement(selectedCell.id, clickPos, selectedCell.piece, piece);

      setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
      setPossibleMoves([]);
      setPlayedMoves((prevMoves) => prevMoves + 1);
      return;
    }

    const forbiddenMovement = checkWhatGetsPlayerInCheck(
      gameRepresentation,
      curPlayer,
      gameHistory,
      movedPieces,
      inCheck
    );

    setIllegalMoves(forbiddenMovement);
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

    // ****** check if players piece was selected
    const selectedPieceColor = pieceColor(piece);  
    if (selectedPieceColor !== curPlayer || selectedPieceColor === null) return console.log(selectedPieceColor);

    // ******select the piece
    processPieceSelection(clickPos, piece, curPlayer, forbiddenMovement);

    // Find the selected piece in the movedPieces array and set its value to true
    setMovedPieces((prevState) => {
      console.log(piece);

     return { ...prevState, [piece]: true,}
     });
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
    // console.log(selectedId, id, selectedPiece, piece, selectedPiece.toLowerCase());

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

    setTimeout(() => {
      const backRankPawnIndex = pawnReachedBackRank(gameRepresentation);
      // console.log(backRankPawnIndex);

      if (backRankPawnIndex < 0) {
        console.log("switching player");
        setCurPlayer(curPlayer === "white" ? "black" : "white");
      }
      setPawnToEvolveIndex((prev) => {
        prev = backRankPawnIndex;
        // console.log(prev);
        return prev;
      });

      setPossibleMoves([]);
      setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
    }, 100);

    console.log(movedPieces);
  };

  const processPieceSelection = (id, piece, curPlayer, forbiddenMovement) => {
    setSelectedCell((prevstate) => ({
      ...prevstate,
      id,
      piece,
      curPlayer,
    }));

    const moves = calculatePossibleMoves(id, piece, gameRepresentation, gameHistory, movedPieces, inCheck);

    const filteredMoves = moves.filter((move) => {
      const { piece: movePiece, move: movePosition } = move;
      if (!illegalMoves) {
        return move;
      }
      const illegalMove = forbiddenMovement?.find((illegal) => {
        console.log(illegal, illegal.move, move, illegal.piece === piece, illegal.move === move);
        return illegal.piece === piece && illegal.move === move;
      });
      return !illegalMove; // Exclude any move that matches an illegal move
    });

    setPossibleMoves(filteredMoves);
  };

  useEffect(() => {}, [gameRepresentation]);
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
        setCurPlayer={setCurPlayer}
        setMovedPieces={setMovedPieces}
        movedPieces={movedPieces}
        setGameRepresentation={setGameRepresentation}
        setPawnToEvolveIndex={setPawnToEvolveIndex}
      />
    </div>
  );
};

export default Board;
