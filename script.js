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
  // DEFINE checkGameOver
  

  // SET board to gameBoard IIFE.
  // CREATE player1 object.
  // CREATE player2 object.
  // SET initial currentPlayer to player1.
  // SET initial isGameOver to false.
  // SET round = 1.

  // WHILE isGameOver is false
    // LET currentPlayer select X and Y for marker to be placed.
    // place currentPlayer marker in board.
    // CALL checkGameOver to check for game over condition, returning winning marker, draw or false.
    // IF checkGameOver is currentPlayer.marker
      // UPDATE currentPlayer score using incrementScore
      // SET isGameOver to true
      // EXIT loop.
    // ELSE if checkGameOve is draw
      // SET isGameOver to False.
    // ELSE
      // UPDATE currentPlayer to the other player object using ternary.
    // ENDIF
  // ENDWHILE
}
