import React, { useState } from "react";
import Board from "../Board";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";
const Game = ({ channel, setChannel }) => {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({ winner: "none", state: "none" });
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <h1> waiting for other player...</h1>;
  }
  return (
    <div>
      <Board
        result={result}
        setResult={setResult}
        height={8}
        width={8}
        
      />
      <Window>
        <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]} />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  );
};

export default Game;
