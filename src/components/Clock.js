import React from 'react'

const Clock = (curPlayer) => {

    const [whiteTime, setWhiteTime] = useState(60);
    const [blackTime, setBlackTime] = useState(60);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (curPlayer === 'white') {
          setWhiteTime((prevTime) => prevTime - 1);
        } else if (curPlayer === "black") {
          setBlackTime((prevTime) => prevTime - 1);
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [curPlayer]);

  return (
    <div className='clock'>
    <div>Player 1: {whiteTime} seconds</div>
    <div>Player 2: {blackTime} seconds</div>
 </div>
  )
}

export default Clock