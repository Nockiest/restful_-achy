import { useContext } from "react";
import TimeContext, { WinAnnounceContext } from "../Context";
const Clock = () => {
  const contextValue = useContext(TimeContext);

  // Access the specific values from the context
  const { whiteTime, blackTime, player } = contextValue;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    return formattedTime;
  };

  return (
    <>
      {player === "black" ? (
        <div className="clock">
          <p>White </p>
          <div> {whiteTime > 1 ? formatTime(whiteTime) : "Player run out of time"}</div>
          <div>{blackTime > 1 ? formatTime(blackTime) : "Player run out of time"} </div>
          <p>Black</p>
        </div>
      ) : (
        <div className="clock">
          <p>Black </p>
          <div>{blackTime > 1 ? formatTime(blackTime) : "Player run out of time"} </div>
          <div> {whiteTime > 1 ? formatTime(whiteTime) : "Player run out of time"}</div>
          <p> White</p>
        </div>
      )}
    </>
  );
};

export default Clock;
