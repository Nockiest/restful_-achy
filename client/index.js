import axios from 'https://cdn.skypack.dev/axios';

const createGameUrl = 'http://localhost:3001/create_game';
const gameStateUrl = 'http://localhost:3001/game_state';
const newMoveUrl = 'http://localhost:3001/new_move';
const beginGameUrl = 'http://localhost:3001/begin_game';
const createGameData = {
  playerName: 'John Doe',
  gameType: 'Chess',
};

function showError(errorString  ){
  console.error(errorString);
  if (typeof errorString !== "string"){
    document.getElementById("debug").innerHTML = "printing value that is not a string "+ errorString
  } else {
   
    document.getElementById("debug").innerHTML = errorString
  }
 
}
document.getElementById('new-move-btn').addEventListener('click', submitMove);

function renderBoard(board) {
  const boardContainer = document.getElementById('board-container');
  boardContainer.innerHTML = ''; // Clear previous content
  if (board.length !== 64) { 
    console.log("BOARD DOESNT HAVE 64 SQUARES")
    return
  }
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');

      const pieceIndex = row * 8 + col;
      const piece = board[pieceIndex];

      if (piece) {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.textContent = piece.abbreviation;
        pieceElement.style.color = piece.color;
        square.appendChild(pieceElement);
      }  

      // Add a small element displaying the index
      const indexElement = document.createElement('div');
      indexElement.classList.add('index');
      indexElement.textContent = pieceIndex;
      square.appendChild(indexElement);

      boardContainer.appendChild(square);
    }
  }
}



export function submitMove() {
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');

  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (!isNaN(from) && !isNaN(to)) {
    const newMoveData = { from, to };

    axios.post(newMoveUrl, newMoveData)
      .then(response => {
        console.log(response.data.message);
        renderBoard(response.data.board);
      })
      .catch(error => {
        console.error('New Move Axios error:', error);
        showError(error  )
      });
  } else {
    showError('Invalid input values. Please enter valid indices.'  )
  
  }
}

// create game function
axios.post(createGameUrl, createGameData)
  .then(response => {
    // Handle create game response if needed
    console.log(response.data.message);
    // Wait for the game to initialize before making further calls
    return axios.post(beginGameUrl);
  })
  .then(response => {
    // Handle begin game response if needed
    console.log(response.data.message);

    // Now that the game has initialized, fetch the game state
    return fetch(gameStateUrl);
  })
  .then(response => {
    if (!response.ok) {
      showError('problem with the server'  )
      throw new Error(`HTTP error! Status: ${response.status}`);
    
  
    }
    return response.json();
  })
  .then(data => {
    // Render the initial board
    renderBoard(data.board);

    // Assuming newMoveData contains the necessary information for the new move
    const newMoveData = {
      from: 3,
      to: 3
    };

    // Make the new move after the game has initialized
    return axios.post(newMoveUrl, newMoveData);
  })
  .then(response => {
    // Handle new move response if needed
    console.log(response.data.message);
    renderBoard(response.data.board);
  })
  .catch(error => {
    console.error('Error:', error);
    renderBoard(error);

  });

setTimeout(() => {
  axios.post(beginGameUrl)
    .then(response => {
      // Handle begin game response if needed
    })
    .catch(error => {
      console.error('Begin Game Axios error:', error);
      renderBoard(`problem with beginning the game ${error}`);

    });
}, 1000);
 
fetch(gameStateUrl)
  .then(response => {
    if (!response.ok) {
      renderBoard(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
      
    }

    return response.json();
  })
  .then(data => {
    // Render the initial board
    renderBoard(data.board);
  })
  .catch(error => {
    renderBoard(`Fetch Game State error:  ${error}`,);
    console.error('Fetch Game State error:', error);
  });

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

 