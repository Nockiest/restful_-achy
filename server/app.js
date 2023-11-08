import express from "express"
import cors from "cors";
import Game from "./game.js"
 
const app = express()
app.use(cors());
app.use(express.json())
 

var beginningState = ["r","n","b","k","q","b","n","r","p","p","p","p","p","p","p","p","","","","","","","","b","","","","","","","","","","","","","","","","","","","","","","","","","","P","P","P","P","P","P","P","P","R","N","B","K","Q","B","N","R"];

var game = null //= new Game(beginningState, 600)

app.post("/create_game", async (req, res)  => {
    // console.log("createing_game ", req)
    game = new Game(beginningState, 600)
    res.json({
      message: "SUCESS",
      game: game
    })
})

app.post( "/begin_game", async (req, res)  =>{
  if (game){
    game.beginGame()
  } else {
    throw new Error (" GAME WANT INITIATED")
  }
   
})

app.post('/new_move', (req, res) => {
  const { from,to } = req.body;

  if (from === undefined || to === undefined  || game === null) {
    console.log(from, to)
    return res.status(400).json({ error: 'There was a problem with the new move', values: {from,to,game} });
  }

  console.log('Received move to index:', from);
  if(game.checkMoveValid(from, to)) {
    game.processValidMovement(from, to)
  }

 
  res.json({
    message: 'Success',
    from 
  });
});

app.get("/game_state", async (req, res)  => {
  // console.log("RECIEVED MOVE ", req)
  res.json({
    message: game 
  })
})


app.listen(3001, () => {
  // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows

  // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
  console.log("Server is running on port 3001");
});