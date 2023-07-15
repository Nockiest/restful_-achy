import { useState, useEffect } from "react";
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
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import {
  pieceColor,
  findKings,
  checkEnPassantWasPlayed,
  calculatePossibleMoves,
  renderCastle,
  findIfCastled,
  isEqual,
} from "../utils";
import { defaultBoardState, forEnPassant, kingCastlingPosition } from "./BoardStates";
import InformationPanel from "./InformationPanel";
import TimeContext from "../Context";
import PieceSelection from "./MovingPiece";
const Board = ({ height, width, player, setPlayer, playersJoined, gameStopped }) => {
  const [gameRepresentation, setGameRepresentation] = useState(forEnPassant);
  const [enPassantPlayed, setEnpassantPlayed] = useState(false);
  const [playerCastled, setPlayerCastled] = useState(false);
  const [inCheck, setInCheck] = useState(false);
  const [illegalMoves, setIllegalMoves] = useState(false);
  const [selectedCell, setSelectedCell] = useState({
    id: null,
    piece: null,
    curPlayer: null,
  });
  const [curPlayer, setCurPlayer] = useState("white");
  const [movedPieces, setMovedPieces] = useState({});
  const [capturedPieces, setCapturedPieces] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [pawnToEvolveIndex, setPawnToEvolveIndex] = useState(null);
  const [callCount, setCallCount] = useState(0);
  const [whiteTime, setWhiteTime] = useState(100000);
  const [blackTime, setBlackTime] = useState(100000);
  const [gameFinnshed, setGameFinnnished] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      // console.log(player, playersJoined);
      if (player === null && player !== "black" && playersJoined !== undefined) {
        setPlayer("black");
      }
    }, 1000);
  }, [player]);
  useEffect(() => {
   if(gameStopped){
    restartGame()
   }
  }, [gameStopped])
  useEffect(() => {
    const interval = setInterval(() => {
      if (curPlayer === "white") {
        if (whiteTime > 0) {
          setWhiteTime((prevTime) => Math.max(prevTime - 1, 0));
        } else {
          announceGameWin("black", "won");
        }
      } else if (curPlayer === "black") {
        if (whiteTime > 0) {
          setBlackTime((prevTime) => Math.max(prevTime - 1, 0));
        } else {
          announceGameWin("white", "won");
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [curPlayer]);
  // const [playedMoves, setPlayedMoves] = useState(0);
  const lastTurn = gameHistory[gameHistory.length - 1];
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const sendTurn = async (updatedGameHistory, gameRepresentation) => {
    await setCurPlayer(curPlayer === "white" ? "black" : "white");
    await setCallCount((prev) => prev + 1);
    // console.log(callCount);

    await channel.sendEvent({
      type: "game-move",
      data: { newTurn: updatedGameHistory[updatedGameHistory.length - 1], gameRepresentation },
    });
  };

  const announceGameWin = async (winner, state) => {
    setGameFinnnished(true);
    await channel.sendEvent({
      type: "game-won",
      data: { winner, state },
    });
  };

  useEffect(() => {
    let unmounted = false; // Add this flag to track unmounting

    // Retrieve the game history from localStorage
    const savedGameHistory = localStorage.getItem("gameHistory");
    if (!unmounted && savedGameHistory) {
      // setGameHistory(JSON.parse(savedGameHistory));
    }

    return () => {
      unmounted = true; // Update the flag to indicate unmounting
    };
  }, []);

  const initializeMovedPieces = () => {
    const pieces = gameRepresentation.flat().filter((piece) => piece !== "");
    const newMovedPieces = {};

    pieces.forEach((piece) => {
      return (newMovedPieces[piece] = false);
    });

    setMovedPieces(newMovedPieces);
  };
  useEffect(() => {
    initializeMovedPieces();
  }, []);

  const restartGame = () => {
    setGameRepresentation(forEnPassant);
    setEnpassantPlayed(false);
    setPlayerCastled(false);
    setInCheck(false);
    setIllegalMoves([]);
    setSelectedCell({
      id: null,
      piece: null,
      curPlayer: null,
    });
    setCurPlayer("white");
    setMovedPieces({});
    setCapturedPieces([]);
    setPossibleMoves([]);
    setGameHistory([]);
    setPawnToEvolveIndex(null);
  };

  const processGameMove = async (clickPos, piece) => {
    if (gameFinnshed || player !== curPlayer || pawnToEvolveIndex > 0) {
      return;
    }

    // console.log(selectedCell,selectedCell.id === clickPos,selectedCell.id)
    //***   Player deselcted piece  by cclicking on a piece of the same color */
    if (selectedCell.id !== null && pieceColor(piece) === curPlayer) {
      setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
      setPossibleMoves([]);
      return;
    }

    // ******* Check if it's the second click on a valid move
    if (selectedCell.id !== null && possibleMoves.includes(clickPos)) {
      processMovement(selectedCell.id, clickPos, selectedCell.piece, piece);

      await setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
      await setPossibleMoves([]);
      // await setPlayedMoves((prevMoves) => prevMoves + 1);
      return;
    }

    // const forbiddenMovement = checkWhatGetsPlayerInCheck(
    //   gameRepresentation,
    //   curPlayer,
    //   gameHistory,
    //   movedPieces,
    //   inCheck
    // );

    // await setIllegalMoves(forbiddenMovement);
    // console.log(forbiddenMovement);
    // if (forbiddenMovement.includes("king stands in check now")) {
    //   await setInCheck(true);

    //   const canEscape = determineMate(gameRepresentation, curPlayer, gameHistory, movedPieces, inCheck);
    //   if (!canEscape) {
    //     console.log(canEscape);
    //     // announceGameWin(curPlayer, "won")
    //   }
    //   console.log("canEscape: ", canEscape);
    // } else {
    //   await setInCheck(false);
    //   const canMove = determineDraw(gameRepresentation, curPlayer, gameHistory, movedPieces, inCheck);
    //   console.log("can he move something? ", canMove);
    //   if (!canMove) {
    //     console.log("IS DRAW?", canMove);
    //     announceGameWin(curPlayer, "tie");
    //   }
    // }

    // ****** check if players piece was selected
    const selectedPieceColor = pieceColor(piece);
    if (selectedPieceColor !== curPlayer || selectedPieceColor === null) return;

    // ******select the piece
    if (piece == "") {
      return;
    }
    let forbiddenMovement = []; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    processPieceSelection(clickPos, piece, curPlayer, forbiddenMovement);

    // Find the selected piece in the movedPieces array and set its value to true
    setMovedPieces((prevState) => {
      return { ...prevState, [piece]: true };
    });
  };

  const processMovement = async (selectedId, id, selectedPiece, piece, clickPos) => {
    let capturedPiece = gameRepresentation[Math.floor(id / 8)][id % 8];
    const moveDetails = {
      color: curPlayer,
      piece: selectedPiece,
      from: selectedId,
      to: id,
      captured: capturedPiece,
      castles: findIfCastled(selectedId, id, selectedPiece),
    };

    const updatedGameHistory = [...gameHistory, moveDetails];
    await setGameHistory(updatedGameHistory);

    await setGameRepresentation((prevGameRepresentation) => {
      let updatedGameRepresentation = [...prevGameRepresentation];
      updatedGameRepresentation = renderCastle(gameRepresentation, curPlayer, selectedId, id, selectedPiece);
      updatedGameRepresentation[Math.floor(selectedId / 8)][selectedId % 8] = "";
      updatedGameRepresentation[Math.floor(id / 8)][id % 8] = selectedPiece;
      return updatedGameRepresentation;
    });

    setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

    let capturedByEnPassant = checkEnPassantWasPlayed(curPlayer === "white" ? "white" : "black", lastTurn, moveDetails);
    console.log(capturedByEnPassant);
    if (capturedByEnPassant) {
      const capturedPiece = gameRepresentation.flat()[capturedByEnPassant];

      setCapturedPieces((prevPieces) => [...prevPieces, capturedPiece]);

      await setGameHistory((prevHistory) => {
        let newHistory = [...prevHistory]; // Create a new array to avoid mutating the original array
        let last = newHistory[newHistory.length - 1];
        console.log(capturedByEnPassant, prevHistory ,last, gameRepresentation.flat()[capturedByEnPassant] );
      
        // Check if `last` exists and has a `captured` property before modifying it
        if (last && typeof last === "object") {
          last.captured = gameRepresentation.flat()[capturedByEnPassant];
          console.log(last, newHistory);
          newHistory[newHistory.length - 1] = last;
        }
      
        return newHistory;
      });
      await setGameRepresentation((prevRepresentation) => {
        const flattenedRepresentation = prevRepresentation.flat();
        flattenedRepresentation[capturedByEnPassant] = "";
        const divideIntoArrays = (flattenedRepresentation, height) => {
          return Array.from({ length: height }, (_, i) => flattenedRepresentation.slice(i * height, (i + 1) * height));
        };
        const updatedRepresentation = divideIntoArrays(flattenedRepresentation, height);

        return updatedRepresentation;
      });
     
    }
    const backRankPawnIndex = pawnReachedBackRank(gameRepresentation);

    if (backRankPawnIndex < 0) {
      sendTurn(updatedGameHistory, gameRepresentation);
    }

    setPawnToEvolveIndex(backRankPawnIndex);
    setPossibleMoves([]);
    // setSelectedCell((prevstate) => ({ id: null, piece: null, curPlayer: null }));
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
        return illegal.piece === piece && illegal.move === move;
      });
      return !illegalMove; // Exclude any move that matches an illegal move
    });

    setPossibleMoves(filteredMoves);
  };

  channel.on("game-move", async (event) => {
    setCallCount((prev) => prev + 1);
    if (event.user.id !== client.userID) {
      const { newTurn, gameRepresentation } = event.data;
      setCurPlayer((prevPlayer) => (prevPlayer === "white" ? "black" : "white"));

      setGameRepresentation(gameRepresentation);
      setGameHistory((prevHistory) => {
        let updatedHistory = [...prevHistory, newTurn];
        for (let i = 0; i < updatedHistory.length - 1; i++) {
          if (isEqual(updatedHistory[i], updatedHistory[i + 1])) {
            updatedHistory.splice(i, 1);
          }
        }
        if (newTurn.captured) {
          const capturedPieceIndex = gameRepresentation.flat().findIndex((piece) => piece === newTurn.captured);
          if (capturedPieceIndex !== -1) {
            const flattenedGameRepresentation = gameRepresentation.flat();
            flattenedGameRepresentation[capturedPieceIndex] = ""; // Set the captured piece to an empty string
            const updatedGameRepresentation = [];
            for (let i = 0; i < flattenedGameRepresentation.length; i += 8) {
              updatedGameRepresentation.push(flattenedGameRepresentation.slice(i, i + 8));
            }
            setGameRepresentation(updatedGameRepresentation);
          }
        }
        // console.log(updatedHistory);
        return updatedHistory;
      });
    }
    await channel.off("game-move");
  });
  channel.on("game-won", async (event) => {
    setGameFinnnished(event);
    await channel.off("game-move");
  });

  useEffect(() => {
    setGameHistory((prevHistory) => {
      let updatedHistory = [...prevHistory];
      for (let i = 0; i < updatedHistory.length - 1; i++) {
        // console.log(updatedHistory[i], updatedHistory[i + 1], isEqual(updatedHistory[i], updatedHistory[i + 1]));
        if (isEqual(updatedHistory[i], updatedHistory[i + 1])) {
          updatedHistory.splice(i, 1);
        }
      }
      return updatedHistory;
    });
  }, [callCount]); // remove duplicate gamehistory calls

  return (
    <div className="game-screen" style={{ background: gameFinnshed ? "red" : "white" }}>
      {player && (
        <TimeContext.Provider value={{ whiteTime, blackTime,player }}>
          <div>
            <h1>  {player === curPlayer?  "YOUR TURN": "Please wait for your opponent"}</h1> 
            <div id="table">
              {gameRepresentation &&
                (player === "black" // Reverse rendering order for black player
                  ? Array.from({ length: height })
                      .reverse()
                      .map((_, i) =>
                        Array.from({ length: width })
                          .reverse()
                          .map((_, j) => {
                            const index = (height - 1 - i) * width + (width - 1 - j);
                            const isGray = (i + j) % 2 === 1;
                            const piece = gameRepresentation[height - 1 - i][width - 1 - j];
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
                      )
                  : Array.from({ length: height }).map((_, i) =>
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
                    ))}
            </div>
          </div>
          <InformationPanel
            selectedCell={selectedCell}
            curPlayer={curPlayer}
            inCheck={inCheck}
            gameHistory={gameHistory}
            capturedPieces={capturedPieces}
            whiteTime={whiteTime}
            blackTime={blackTime}
          />

          <EvolvePawnPanel
            pawnToEvolveIndex={pawnToEvolveIndex}
            gameRepresentation={gameRepresentation}
            curPlayer={curPlayer}
            setMovedPieces={setMovedPieces}
            movedPieces={movedPieces}
            setGameRepresentation={setGameRepresentation}
            setPawnToEvolveIndex={setPawnToEvolveIndex}
            gameHistory={gameHistory}
            sendTurn={sendTurn}
          />
          {typeof player == "string" && <p>you play as: {player}</p>}
          <PieceSelection selectedCell={selectedCell} />
        </TimeContext.Provider>
      )}
    </div>
  );
};

export default Board;
