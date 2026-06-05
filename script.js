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

