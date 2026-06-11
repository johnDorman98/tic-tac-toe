// IIFE to handle the creation of a Tic Tac Toe board.
const gameBoard = (() => {
  const rows = 3;
  const cols = 3;
  
  // Represent game board as a row * col with empty cells to be populated by markers(X/O).
  const board = Array.from({length: rows}, () => Array.from({length: cols}, () => ""));

  // Update board with marker at specified row and col.
  addMarker = (row, col, marker) => {
    if (row < rows && row >= 0 && col < cols && col >= 0) {
      board[row].splice(col, 1, marker);
    }
  }

  // Handle retrieving the board.
  getBoard = () => {
    return board;
  }
  
  return {addMarker, getBoard};
})();

// TODO:
// Should input validation be done in the game controller
// Would it be necessary for gameBoard to return the rows and cols via a method to be used by game controller.
// Would the game controller be responsible for managing the marker selection between two players or would it be random.

// Factory function to handle the creation of Player objects.
const player = (name, marker) => {
  let score = 0;

  // Methods for managing attributes.
  getScore = () => {
    return score;
  }

  incrementScore = () => {
    score++;
  }

  return {name, marker, getScore, incrementScore};
}

// Factory function for the game logic
const gameController = () => {
  // Method to determine if game over state is met.
  const checkGameOver = (marker, boardToCheck) => {
    console.log(boardToCheck);
    console.log(marker);
    
    
    // Check for three in a row horizontally.
    for (let row = 0; row < boardToCheck[0].length; row++) {
      let markerInRow = 0;
      console.log(`Row to check: ${row} = ${boardToCheck[row]}`);
      for (let col = 0; col < boardToCheck[row].length; col++) {
        console.log(`Column to check: ${col} = ${boardToCheck[row][col]}`);
        const cell = boardToCheck[row][col];
        if (cell === marker) {
          console.log("marker found, incrementing count");
          markerInRow++;
        }
      }

      if (markerInRow == 3) {
        return marker
      }
    }
    // TODO:
    // Check for vertical three in row
    // Check for diagonal three in row
    // Check for draw
  }
  // DEFINE checkGameOver(marker, boardToCheck) to return marker, "draw", or "false"
    // IF marker has three in a row (vertically, horizontally, diagonally)
      // SET threeInRow to false.
      // Check for three in row horizontally.
        // Using nested loop board[row][col]
        // SET threeInRow to true if found.
      // Check for three in a row vertically.
        // Using nested loop board[col][row]
        // SET threeInRow to true if found.
      // Check for three in a row horizontally
        // Using an outer loop to control the rows and hard coding specific columns.
        // SET threeInRow to true if found.

      // IF threeInRow is true
        // return marker
    // ELSE IF there are no empty cells
      // return "draw"
    // ELSE
      // return "false"
    // ENDIF
  
  const board = gameBoard;

  const player1 = player("Player1", "X");
  const player2 = player("Player2", "O");
  let currentPlayer = player1;

  let isGameOver = false;
  // SET round = 1.
  console.log(currentPlayer);
  
  // Allow each user to take place a marker until the game is complete.
  while (!isGameOver) {
    // Retrieve desired marker position.
    console.table(board.getBoard());
    if (prompt(`${currentPlayer.name}: Add marker`) === "yes") {
      const markerRow = prompt("Please enter desired row for marker:");
      const markerColumn = prompt("Please enter desired column for marker:");

      board.addMarker(markerRow, markerColumn, currentPlayer.marker)
      const gameOverResult = checkGameOver(currentPlayer.marker, board.getBoard())
      if (gameOverResult === currentPlayer.marker) {
        console.log("Player Marker Found");
        currentPlayer.incrementScore;
        isGameOver = true;
      } else if (gameOverResult === "draw") {
        console.log("Draw");
        
        isGameOver = true;
      } else {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        console.log(currentPlayer);
      }
    } else {
      isGameOver = true
    }
    

  }
}

gameController();
