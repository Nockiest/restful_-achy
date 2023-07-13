import   { useContext } from "react";
import TimeContext, { WinAnnounceContext } from "../Context";
const Clock = () => {
  const contextValue = useContext(TimeContext);

  // Access the specific values from the context
  const { whiteTime, blackTime } = contextValue;

  return (
    <div className="clock">
      <div className="clock">
        <div>Player 1: {whiteTime > 1 ? `${whiteTime} seconds` : "Player run out of time"}</div>
        <div>Player 2: {blackTime > 1 ? `${blackTime} seconds` : "Player run out of time"}</div>
      </div>
    </div>
  );
};

export default Clock;
