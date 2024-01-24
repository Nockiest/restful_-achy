"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const utils_js_1 = require("./utils.js");
const grafics_js_1 = require("./grafics.js");
const createGameUrl = "http://localhost:3001/create_game";
const gameStateUrl = "http://localhost:3001/game_state";
const newMoveUrl = "http://localhost:3001/new_move";
const beginGameUrl = "http://localhost:3001/begin_game";
const getGamesUrl = "http://localhost:3001/game_ids";
const joinGameUrl = "http://localhost:3001/join_game";
let gameId = null;
let playerID = 'abcd';
const createGameData = {
    whiteId: playerID,
    blackId: 'black',
    gameType: "Chess",
};
let gamesList;
let gameNumber;
document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    document.getElementById("find-game-btn").addEventListener("click", listGames);
    document.getElementById("new-move-btn").addEventListener("click", submitMove);
    document.getElementById("begin-game-btn").addEventListener("click", beginGame);
    document.getElementById("generate-game-btn").addEventListener("click", generateGame);
    const gamesList = document.getElementById("games-list");
    const gameNumber = document.getElementById('game-number-display');
    gamesList.addEventListener('click', handleGameListClick);
});
function handleGameListClick(event) {
    // Check if the clicked element is an <li> element
    if (event.target.tagName === 'LI') {
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
        axios_1.default
            .post(newMoveUrl, newMoveData)
            .then((response) => {
            console.log(response.data.message);
            (0, grafics_js_1.renderBoard)(response.data.board);
        })
            .catch((error) => {
            (0, utils_js_1.showError)(`New Move Axios error: ${error}`);
        });
    }
    else {
        (0, utils_js_1.showError)("Invalid input values. Please enter valid indices.");
    }
}
function generateGame() {
    axios_1.default.post(createGameUrl, createGameData)
        .then((response) => {
        console.log(response.data.newGame.gameId);
        gameId = response.data.newGame.gameId;
        listGames();
        fetchBoard();
    })
        .catch((error) => {
        (0, utils_js_1.showError)(error);
    });
}
function fetchBoard() {
    axios_1.default
        .get(gameStateUrl, { params: { gameId } })
        .then((response) => {
        console.log(response.data);
        (0, grafics_js_1.renderBoard)(response.data.board);
    })
        .catch((error) => {
        (0, utils_js_1.showError)(`Fetch Game State error:  ${error}`);
    });
}
function beginGame() {
    axios_1.default
        .post(beginGameUrl, { gameId, playerID })
        .then((response) => {
        console.log("response");
        return response.data;
    })
        .then((data) => {
        console.log(data);
        (0, grafics_js_1.renderBoard)(data.board);
        gameId = data.gameId;
        gameNumber.innerHTML = gameId ? gameId : ""; // Update the gameNumber only if gameId is not null
    })
        .catch((error) => {
        (0, utils_js_1.showError)(`Fetch Game State error: ${error}`);
    });
}
function joinGame(lookedGameId) {
    if (!lookedGameId) {
        (0, utils_js_1.showError)(`"lookedGameId is null or undefined: ${lookedGameId}`);
        return;
    }
    else if (gameId) {
        (0, utils_js_1.showError)('already in game');
        return;
    }
    axios_1.default
        .post(joinGameUrl, { gameId: lookedGameId, playerID: playerID })
        .then((response) => {
        console.log("response", response);
        if (!response.data) {
            (0, utils_js_1.showError)(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming response.data contains the expected data structure
        const data = response.data;
        // Render the initial board
        console.log(data);
        (0, grafics_js_1.renderBoard)(data.board);
        gameId = lookedGameId;
        gameNumber.innerHTML = gameId;
    })
        .catch((error) => {
        (0, utils_js_1.showError)(`Fetch Game State error: ${error}`);
    });
}
function listGames() {
    axios_1.default
        .get(getGamesUrl)
        .then((response) => {
        console.log(response);
        (0, utils_js_1.createListItems)(response.data, "games-list");
        // gamesList.innerHTML = response.data;
    })
        .catch((error) => {
        (0, utils_js_1.showError)(`New List Games error: ${error}  `);
    });
}
 