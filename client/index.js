import axios from "https://cdn.skypack.dev/axios";
import { createListItems, showError } from "./utils.js";
import { renderBoard } from "./grafics.js";
// import { v4 as uuidv4 } from 'uuidv4';
// const utils = require('utils');
const createGameUrl = "http://localhost:3001/create_game";
const gameStateUrl = "http://localhost:3001/game_state";
const newMoveUrl = "http://localhost:3001/new_move";
const beginGameUrl = "http://localhost:3001/begin_game";
const getGamesUrl = "http://localhost:3001/game_ids";
const joinGameUrl = "http://localhost:3001/join_game";

let gameId = null;
let playerID = "abcd";
const createGameData = {
  whiteId: playerID,
  blackId: "black",
  gameType: "Chess",
}; // currently unusedS

// Add a click event listener to the <ul> element

document.getElementById("find-game-btn").addEventListener("click", listGames);
document.getElementById("new-move-btn").addEventListener("click", submitMove);
document.getElementById("begin-game-btn").addEventListener("click", beginGame);
// document.getElementById("fetch-game-btn").addEventListener("click", fetchBoard);
document
  .getElementById("generate-game-btn")
  .addEventListener("click", generateGame);
const gamesList = document.getElementById("games-list");
const gameNumber = document.getElementById("game-number-display");
gamesList.addEventListener("click", handleGameListClick);
setInterval(fetchBoard, 1000);

function handleGameListClick(event) {
  // Check if the clicked element is an <li> element
  if (event.target.tagName === "LI") {
    // Retrieve the innerHTML of the clicked <li> element
    const innerHTML = event.target.innerHTML;
    // Return the innerHTML
    console.log(innerHTML);
    joinGame(innerHTML);
  }
}

function submitMove() {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");

  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (!isNaN(from) && !isNaN(to) && gameId) {
    const newMoveData = { from, to, gameId, playerID };

    axios
      .post(newMoveUrl, newMoveData)
      .then((response) => {
        console.log(response.data.message);
        renderBoard(response.data.board);
      })
      .catch((error) => {
        showError("New Move Axios error:", error);
      });
  } else {
    showError("Invalid input values. Please enter valid indices.");
  }
}

function generateGame() {
  // create game function
  axios
    .post(createGameUrl, createGameData)
    .then((response) => {
      // Handle create game response if needed
      console.log(response.data.newGame.gameId);
      gameId = response.data.newGame.gameId;
      // Wait for the game to initialize before making further calls
      // return axios.post(beginGameUrl);
      listGames();
      fetchBoard();
      return  beginGame()
    })


    .catch((error) => {
      showError(error);
    });
}

function fetchBoard() {
  if (!gameId) {
    return;
  }
  axios
    .get(gameStateUrl, { params: { gameId } })
    .then((response) => {
      console.log(response.data, response.ok); // Corrected spelling here
      // if (!response.ok) {
      //   showError(`HTTP error! Status: ${response.status}`);
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      console.log(response.data.time, document.getElementById('BlackTime'), document.getElementById('WhiteTime') )
      renderBoard(response.data.board);
      document.getElementById('BlackTime').innerHTML = response.data.time[1]
      document.getElementById('WhiteTime').innerHTML = response.data.time[0]
    })
    .catch((error) => {
      showError(`Fetch Game State error:  ${error}`);
    });
}

function beginGame() {
  console.log(gameId);
  axios
    .post(beginGameUrl, { gameId, playerID })
    .then((response) => {
      console.log("response");
      if (!response.ok) {
        showError(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // Render the initial board
      console.log(data);
      renderBoard(data.board);
      gameId = data.gameId;
      gameNumber.innerHTML = gameId;
    })
    .catch((error) => {
      showError(`Fetch Game State error:  ${error}`);
    });
}

function joinGame(lookedGameId) {
  if (!lookedGameId) {
    showError(`"lookedGameId is null or undefined: ${lookedGameId}`);
    return;
  }

  axios
    .post(joinGameUrl, { gameId: lookedGameId, playerID: playerID })
    .then((response) => {
      console.log("response", response);
      if (!response.data) {
        showError(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming response.data contains the expected data structure
      const data = response.data;

      // Render the initial board
      console.log(data);
      renderBoard(data.board);
      gameId = lookedGameId;
      gameNumber.innerHTML = gameId;
    })
    .catch((error) => {
      showError(`Fetch Game State error: ${error}`);
    });
}

function listGames() {
  axios
    .get(getGamesUrl)
    .then((response) => {
      console.log(response);
      createListItems(response.data, "games-list");
      // gamesList.innerHTML = response.data;
    })
    .catch((error) => {
      showError("New List Games error:", error);
    });
}


// listGames()
// fetch(gameStateUrl)
//   .then(response => {
//     if (!response.ok) {
//       showError(`HTTP error! Status: ${response.status}`);
//       throw new Error(`HTTP error! Status: ${response.status}`);

//     }

//     return response.json();
//   })
//   .then(data => {
//     // Render the initial board
//     renderBoard(data.board);
//   })
//   .catch(error => {
//     showError(`Fetch Game State error:  ${error}`,);
//
//   });

// Assuming newMoveData contains the necessary information for the new move
// const newMoveData = {
//   from: 3,
//   to: 3
// };

// axios.post(newMoveUrl, newMoveData)
//   .then(response => {
//     console.log(response.data )
//     renderBoard(response.data.board);
//   })
//   .catch(error => {
//     console.error('New Move Axios error:', error);
//   });

// const newMoveData = {
//   from: 3,
//   to: 3
// };

// // Make the new move after the game has initialized
// return axios.post(newMoveUrl, newMoveData);

// .then(response => {
//   // Handle begin game response if needed

//   console.log(response )
//   // gameId = response.data.newGame.gameId
//   // Now that the game has initialized, fetch the game state
//   return fetch(gameStateUrl);
// })
// .then(response => {
//   if (!response.ok) {
//     showError('problem with the server'  )
//     throw new Error(`HTTP error! Status: ${response.status}`);

//   }
//   return response.json();
// })
// .then(data => {
//   // Render the initial board
//   renderBoard(data.board);

//   // Assuming newMoveData contains the necessary information for the new move

// })
// .then(response => {
//   // Handle new move response if needed
//   console.log(response.data.message);
//   renderBoard(response.data.board);
// })
