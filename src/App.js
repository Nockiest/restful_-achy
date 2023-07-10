import React, {useState} from "react"
import Board from './components/Board';
import "./App.css"
const App = () => {
  const [curPlayer, setCurPlayer] = useState("white")
  
  return (
    <div>
      <Board  height={8} width={8}   curPlayer={curPlayer} setCurPlayer={setCurPlayer} />
    </div>
  );
};

export default App;