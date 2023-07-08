import React, {useState} from "react"
import Board from './components/Board';
import "./App.css"
const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("white")
  
  return (
    <div>
      <Board  height={8} width={8}   currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />
    </div>
  );
};

export default App;