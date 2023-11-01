import axios from 'https://cdn.skypack.dev/axios';

const createGameUrl = 'http://localhost:3001/create_game';
const gameStateUrl = 'http://localhost:3001/game_state';
const newMoveUrl = 'http://localhost:3001/new_move';
const beginGameUrl = 'http://localhost:3001/begin_game';
const createGameData = {
  playerName: 'John Doe',
  gameType: 'Chess',
};

axios.post(createGameUrl, createGameData)
  .then(response => {
    // console.log('Create Game Response:', response.data);
  })
  .catch(error => {
    console.error('Create Game Axios error:', error);
  });


  setTimeout(() => {
    axios.post(beginGameUrl)
      .then(response => {
        console.log('Begin Game Response:', response.data);
      })
      .catch(error => {
        console.error('Begin Game Axios error:', error);
      });
  }, 1000); // 1000 milliseconds (1 second) delay

fetch(gameStateUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  })
  .then(data => {
    // console.log('Game State:', data);
  })
  .catch(error => {
    console.error('Fetch Game State error:', error);
  });


// Assuming newMoveData contains the necessary information for the new move
const newMoveData = {
  from:  54 ,
  to: 63
};

axios.post(newMoveUrl, newMoveData)
  .then(response => {
    // console.log('New Move Response:', response.data);
  })
  .catch(error => {
    console.error('New Move Axios error:', error);
  });