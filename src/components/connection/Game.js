import { useState, Children, useEffect } from "react";
import Board from "../Board";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";
const Game = ({ channel, setChannel, client }) => {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [player, setPlayer] = useState(null);
  const [gameStopped, setGameStopped] = useState(false);
  useEffect(() => {
    const handleUserWatchingStop = (event) => {
      if (channel.state.watcher_count !== 2) {
        alert("opponent left the game")
        
        channel.stopWatching();
       
        setChannel(null);
        
      }
    };

    channel.on("user.watching.start", (event) => {
      if (channel.state.watcher_count === 2) {
        setPlayer("white");
      } else {
        setPlayer("black");
      }
      setPlayersJoined(event.watcher_count === 2);
    });

    channel.on("game-won", (event) => {
      setResult({ winner: event.data.winner, state: "won" });
    });

    channel.on("user.watching.stop", handleUserWatchingStop);

    return () => {
      setGameStopped(true)
      channel.off("user.watching.stop", handleUserWatchingStop);
    };
  }, [channel, setChannel]);

  if (!playersJoined) {
    return <h1>Waiting for the other player...</h1>;
  }

  return (
    <div className="game">
      <div className="btn-col">
        <button
          className="leave-game-btn"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          Leave Game
        </button>
        <button>Restart Game</button>
      </div>
      <Board
        result={result}
        setResult={setResult}
        height={8}
        width={8}
        player={player}
        setPlayer={setPlayer}
        playersJoined={playersJoined}
        gameStopped={gameStopped}
      />
      {result.state === "won" && <div>{result.winner} Won The Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
      <Window>
        <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]} />
        <MessageInput noFiles />
      </Window>
    </div>
  );
};

export default Game;
