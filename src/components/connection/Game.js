import { useState, Children, useEffect } from "react";
import Board from "../Board";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";
const Game = ({ channel, setChannel, client }) => {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [player, setPlayer] = useState(null);
  channel.on("user.watching.start", (event) => {
    console.log(channel.state.watcher_count === 2);
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

  if (!playersJoined) {
    return <h1> waiting for other player...</h1>;
  }
  return (
    <div className="game">
      <Window>
        <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]} />
        <MessageInput noFiles />
      </Window>
      <div className="btn-col">
        <button
          className="leave-game-btn"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          {" "}
          Leave Game
        </button>
        <button>RESTART game</button>
      </div>
      <Board result={result} setResult={setResult} height={8} width={8} player={player} setPlayer={setPlayer} playersJoined={playersJoined} />
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  );
};

export default Game;
