import React, { createContext } from 'react';

const TimeContext = createContext({
  whiteTime: 0,
  blackTime: 0,
});

export const WinAnnounceContext = createContext({
    announceGameWin: () => {}
  });
  

export default TimeContext;
 