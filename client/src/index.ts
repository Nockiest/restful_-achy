import axios from "axios";
import { createListItems, showError } from "./utils.js";
import { renderBoard } from "./grafics.js";

const createGameUrl: string = "http://localhost:3001/create_game";
const gameStateUrl: string = "http://localhost:3001/game_state";
const newMoveUrl: string = "http://localhost:3001/new_move";
const beginGameUrl: string = "http://localhost:3001/begin_game";
const getGamesUrl: string = "http://localhost:3001/game_ids";
const joinGameUrl: string = "http://localhost:3001/join_game";

let gameId: string | null = null;
let playerID: string = 'abcd';
const createGameData: { whiteId: string; blackId: string; gameType: string } = {
  whiteId: playerID,
  blackId: 'black',
  gameType: "Chess",
};
let gamesList: HTMLElement
let gameNumber: HTMLElement
document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  document.getElementById("find-game-btn")!.addEventListener("click", listGames);
  document.getElementById("new-move-btn")!.addEventListener("click", submitMove);
  document.getElementById("begin-game-btn")!.addEventListener("click", beginGame);
  document.getElementById("generate-game-btn")!.addEventListener("click", generateGame);
  const gamesList: HTMLElement = document.getElementById("games-list")!;
  const gameNumber: HTMLElement = document.getElementById('game-number-display')!;
  gamesList.addEventListener('click', handleGameListClick);
});

function handleGameListClick(event: MouseEvent): void {
  // Check if the clicked element is an <li> element
  if ((event.target as HTMLElement).tagName === 'LI') {
    // Retrieve the innerHTML of the clicked <li> element
    const innerHTML: string = (event.target as HTMLElement).innerHTML;
    // Return the innerHTML
    console.log(innerHTML);
    joinGame(innerHTML);
  }
}

function submitMove(): void {
  const fromInput: HTMLInputElement = document.getElementById("from") as HTMLInputElement;
  const toInput: HTMLInputElement = document.getElementById("to") as HTMLInputElement;

  const from: number = parseInt(fromInput.value);
  const to: number = parseInt(toInput.value);

  if (!isNaN(from) && !isNaN(to) && gameId) {
    const newMoveData: { from: number; to: number; gameId: string; playerID: string } = { from, to, gameId, playerID };

    axios
      .post(newMoveUrl, newMoveData)
      .then((response) => {
        console.log(response.data.message);
        renderBoard(response.data.board);
      })
      .catch((error) => {
        showError(`New Move Axios error: ${ error}` );
      });
  } else {
    showError("Invalid input values. Please enter valid indices.");
  }
}

function generateGame(): void {
  axios.post(createGameUrl, createGameData)
    .then((response) => {
      console.log(response.data.newGame.gameId);
      gameId = response.data.newGame.gameId;
      listGames();
      fetchBoard();
    })
    .catch((error) => {
      showError(error);
    });
}

function fetchBoard(): void {
  axios
    .get(gameStateUrl, { params: { gameId } })
    .then((response) => {
      console.log(response.data,  );
      renderBoard(response.data.board);
    })
    .catch((error) => {
      showError(`Fetch Game State error:  ${error}`);
    });
}

function beginGame(): void {
  axios
    .post(beginGameUrl, { gameId, playerID })
    .then((response) => {
      console.log("response");


      return response.data;
    })
    .then((data) => {
      console.log(data);
      renderBoard(data.board);
      gameId = data.gameId;

      gameNumber.innerHTML = gameId ? gameId : ""; // Update the gameNumber only if gameId is not null
    })
    .catch((error) => {

        showError(`Fetch Game State error: ${error}`);

    });
}

function joinGame(lookedGameId: string): void {
  if (!lookedGameId) {
    showError(`"lookedGameId is null or undefined: ${lookedGameId}`);
    return;
  }
  else if(gameId){
    showError('already in game')
    return
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
      const data: any = response.data;

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

function listGames(): void {
  axios
    .get(getGamesUrl)
    .then((response) => {
      console.log(response);
      createListItems(response.data, "games-list");
      // gamesList.innerHTML = response.data;
    })
    .catch((error) => {
      showError(`New List Games error: ${error}  `  );
    });
}
