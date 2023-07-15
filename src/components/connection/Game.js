import { useState, Children, useEffect } from "react";
import Board from "../Board";
import "./Chat.css";
import { Window, MessageList, MessageInput } from "stream-chat-react";
const Game = ({ channel, setChannel, client }) => {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [player, setPlayer] = useState(null);
  const [gameStopped, setGameStopped] = useState(false);
  
  const askForNewGame = async () => {
    await channel.sendEvent({ type: "ask-for-new-game" });
  };

  useEffect(() => {
    const handleUserWatchingStop = (event) => {
      if (channel.state.watcher_count !== 2) {
        alert("Opponent left the game");
        channel.stopWatching();
        setChannel(null);
      }
    };

    const handleAskForNewGame = async (senderName) => {
      console.log("event fired",senderName?.user?.name, client?.user?.name)
       if(senderName?.user?.name ===client?.user?.name){return console.log("sender")}
      const response = window.confirm("Opponent has requested a new game. Do you want to start a new game?");
    console.log("confirmed", response)
      await channel.sendEvent({ type: "new-game-response",  data: response });
    };

    const handleNewGameResponse = (event) => {
     console.log(event, event.data)
      const { data  } = event;
      if (data) {
        // Restart the game
        setResult({ winner: "none", state: "none" });
        console.log("LETS START A NEW GAME");
        channel.sendEvent({ type: "user-restarted-game", data: { restarted: true } });
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
    channel.on("ask-for-new-game", handleAskForNewGame);

    channel.on("new-game-response", handleNewGameResponse);
    return () => {
      setGameStopped(true);
      channel.off("user.watching.stop", handleUserWatchingStop);
      channel.off("ask-for-new-game", handleAskForNewGame);
      channel.off("new-game-response", handleNewGameResponse);
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
        <button onClick={askForNewGame}>Ask for a new game</button>
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
