import React from 'react'
import TimeContext, {WinAnnounceContext} from "./Context"
const Clock = () => {
 
  return (
    <div className='clock'>
         <TimeContext.Provider value={{ whiteTime, blackTime }}> 
         <div className="clock">
            <div>Player 1: {whiteTime >  1 ? `${whiteTime} seconds` : 'Player run out of time'}</div>
            <div>Player 2: {blackTime >  1 ? `${blackTime} seconds` : 'Player run out of time'}</div>
        </div>
         </TimeContext.Provider>
 </div>
  )
}

export default Clock