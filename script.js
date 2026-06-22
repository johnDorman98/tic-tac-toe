/**
 * @file Core logic for a modular Tic Tac Toe game.
 * @summary Separates state management, user interface rendering, and game loop logic.
 * * Architecture Workflow:
 *  gameController - Detects user interactions, manages player turn states, and evaluates game outcomes.
 *  gameBoard - Encapsulates the internal 3x3 grid data structure and validation rules.
 *  displayController - Manages DOM manipulation, builds the grid layout, and renders markers.
 */

/**
 * Maintains the state of the 3x3 grid, providing methods to safely modify it.
 * @namespace gameBoard
 */
const gameBoard = (() => {
  const rows = 3;
  const cols = 3;

  let board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );

  /**
   * Handles adding the provided marker to the select cell at board[row][col].
   * @param {number} row - Represents the select row to place the marker.
   * @param {number} col - Represents the select column to place the marker.
   * @param {string} marker - Represents the marker to be placed within the board.
   * @memberof gameBoard
   * @returns {boolean} Returns true if the marker was placed successfully, false otherwise.
   */
  addMarker = (row, col, marker) => {
    if (row < rows && row >= 0 && col < cols && col >= 0) {
      if (board[row][col] === "") {
        board[row][col] = marker;
        return true;
      }

      return false;
    }
  };

  /**
   * Responsible for safely retrieving the board.
   * @memberof gameBoard
   * @returns {string[][]} Returns the game board to help protect the board.
   */
  getBoard = () => {
    return board;
  };

  /**
   * Handles retrieving the size of the board, to protect the number of rows and columns used.
   * @memberof gameBoard
   * @returns {{rows: number, cols: number}} Returns an object containing the number of rows and columns
   *  used to create the board.
   */
  getBoardSize = () => {
    return { rows, cols };
  };

  /**
   * Responsible for resetting the game board back to its initial state.
   * @memberof gameBoard
   */
  resetBoard = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col] = "";
      }
    }
  };

  return { addMarker, getBoard, getBoardSize, resetBoard };
})();

/**
 * Handles the creation of player objects, protecting the players score.
 * @param {string} initialName - Name to represent the player.
 * @param {string} marker - The players select marker.
 * @returns {{ name: string, marker: string, getScore: function(): number, incrementScore: function(): void }}
 *  Returns an object to represent a player and functions to adjust the players score.
 */
const player = (initialName, marker) => {
  let name = initialName
  let score = 0;
  
  /**
   * Retrieves the players name to protect it.
   * @memberof player
   * @returns {string} Returns the players name.
   */
  getName = () => {
    return name;
  };

  /**
   * Sets the players name to protect it.
   * @param {string} updatedName - New value for players name.
   * @memberof player
   */
  setName = (updatedName) => {
    name = updatedName;
  };

  /**
   * Retrieves the players score to protect it.
   * @memberof player
   * @returns {number} Returns the players score.
   */
  getScore = () => {
    return score;
  };

  /**
   * Increments the players current score by one.
   */
  incrementScore = () => {
    score++;
  };

  return { marker, getName, setName, getScore, incrementScore };
};

/**
 * Responsible for primary game loop logic and managing the gameBoard and player objects.
 */
const gameController = () => {
  /**
   * Handles checking for three in each of the rows (horizontally).
   * @param {string} marker - The marker to check for matching three in a row.
   * @param {string[][]} boardToCheck - The board to check for matching three in a row.
   * @returns {boolean} true if marker is found three in a row, else false.
   */
  const checkThreeInRow = (marker, boardToCheck) => {
    for (let row = 0; row < boardToCheck.length; row++) {
      let markerInRow = 0;
      for (let col = 0; col < boardToCheck[row].length; col++) {
        const cell = boardToCheck[row][col];
        if (cell === marker) {
          markerInRow++;
        }
      }

      if (markerInRow == 3) {
        return true;
      }
    }

    return false;
  };

  /**
   * Handles checking the board for matching three in a column (vertically).
   * @param {string} marker - The marker to check for matching three in a column.
   * @param {string[][]} boardToCheck - The board to check for matching three in a column.
   * @returns {boolean} true if marker is found three in a column, else false.
   */
  const checkThreeInColumn = (marker, boardToCheck) => {
    for (let col = 0; col < boardToCheck[0].length; col++) {
      let markerInCol = 0;
      for (let row = 0; row < boardToCheck.length; row++) {
        const cell = boardToCheck[row][col];
        if (cell === marker) {
          markerInCol++;
        }
      }

      if (markerInCol === 3) {
        return true;
      }
    }

    return false;
  };

  /**
   * Handles checking the two diagonals of the grid for a matching marker three in a diagonal row.
   * @param {string} marker - Represents the marker to check for matching three diagonally.
   * @param {string[][]} boardToCheck - The board to check for three in either of the diagonals.
   * @returns {boolean} true if marker is found in either diagonals, else false.
   */
  const checkDiagonalWin = (marker, boardToCheck) => {
    let diagonalWin = true;

    // Checks the top-left to bottom-right diagonal for a matching three of the marker.
    for (let i = 0; i < boardToCheck.length; i++) {
      if (boardToCheck[i][i] !== marker) {
        diagonalWin = false;
        break;
      }
    }

    // Return early to prevent checking the other diagonal.
    if (diagonalWin) {
      return diagonalWin;
    } else {
      // Reset for top-right to bottom-left diagonal check.
      diagonalWin = true;

      // Top-right to bottom-left diagonal check for three in a row.
      for (let i = 0; i < boardToCheck.length; i++) {
        // Control the column to check for top-right to bottom-left.
        let colToCheck = 2 - i;

        if (boardToCheck[i][colToCheck] !== marker) {
          diagonalWin = false;
          break;
        }
      }
    }

    return diagonalWin;
  };

  /**
   * Handles checking the board to determine if the board is full.
   * @param {string[][]} boardToCheck - The board to be checked for a draw.
   * @returns {boolean} true if the board is full (draw), else false.
   */
  const checkDraw = (boardToCheck) => {
    for (let row = 0; row < boardToCheck.length; row++) {
      for (let col = 0; col < boardToCheck[row].length; col++) {
        if (boardToCheck[row][col] === "") {
          return false;
        }
      }
    }

    return true;
  };

  /**
   * Responsible for checking if a game over condition is met using helper functions.
   * @param {string} marker - The players maker to check.
   * @param {string[][]} boardToCheck - The board to be checked for a game over condition.
   * @returns {string} the players marker if a win condition is met, else "draw" if the board contains no empty cells.
   */
  const checkGameOver = (marker, boardToCheck) => {
    if (checkThreeInRow(marker, boardToCheck)) {
      return marker;
    } else if (checkThreeInColumn(marker, boardToCheck)) {
      return marker;
    } else if (checkDiagonalWin(marker, boardToCheck)) {
      return marker;
    } else if (checkDraw(boardToCheck)) {
      return "draw";
    }
  };

  // Initialise board and UI.
  const board = gameBoard;
  const { rows, cols } = board.getBoardSize();
  const display = displayController;
  const boardContainerElement = display.getBoardContainer();
  display.createBoard(rows, cols);

  // Setup player objects and starting current player.
  const firstPlayerNameElement = document.querySelector("#first-player-name");
  const secondPlayerNameElement = document.querySelector("#second-player-name");
  const player1 = player(firstPlayerNameElement, "X");
  const player2 = player(secondPlayerNameElement, "O");
  let currentPlayer = player1;

  let isGameOver = false;

  // Select DOM elements for UI interaction.
  const resetButtonElement = document.querySelector('button[type="reset"]');
  const outcomeModal = document.querySelector("#game-outcome-modal");
  const outcomeFeedback = document.querySelector("#game-outcome");
  const outcomeModalClose = document.querySelector("#game-outcome-close");

  // Update to add event listener for name update button
  // Listen for submit to player-config-modal to update currentPlayer name using the setName method.

  /**
   * Listens for click even on the board to attempt to place the current players marker.
   */
  boardContainerElement.addEventListener("click", (event) => {
    // Early return if the game is over and prevent further clicks from changing the board state.
    if (isGameOver) {
      return;
    }

    const selectedCell = event.target;
    const selectedRow = selectedCell.dataset.row;
    const selectedColumn = selectedCell.dataset.col;

    if (board.addMarker(selectedRow, selectedColumn, currentPlayer.marker)) {
      display.updateBoard(selectedRow, selectedColumn, currentPlayer.marker);
      const gameOverResult = checkGameOver(
        currentPlayer.marker,
        board.getBoard(),
      );

      if (gameOverResult === currentPlayer.marker) {
        const gameOverMessage = `Game over! ${currentPlayer.name} Wins!`;
        outcomeFeedback.textContent = gameOverMessage;
        setTimeout(() => {
          outcomeModal.showModal();
        }, 100);
        isGameOver = true;
      } else if (gameOverResult === "draw") {
        const gameOverMessage = "Game over! Draw!";
        outcomeFeedback.textContent = gameOverMessage;
        setTimeout(() => {
          outcomeModal.showModal();
        }, 100);
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    } else {
      const gameOverMessage = `${currentPlayer.marker} not placed, please select an empty cell.`;
      outcomeFeedback.textContent = gameOverMessage;
      outcomeModal.showModal();
    }
  });

  /**
   * Handles closing the model when the modal close button is pressed.
   */
  outcomeModalClose.addEventListener("click", () => {
    outcomeModal.close();
  });

  /**
   * Responsible for resetting the game state, board, and UI if reset button is pressed.
   */
  resetButtonElement.addEventListener("click", () => {
    board.resetBoard();
    display.resetDisplay();
    currentPlayer = player1;
    isGameOver = false;
    outcomeFeedback.textContent = "";
  });
};

/**
 * Responsible for updating the UI with the current state of the game board.
 * @namespace displayController
 */
const displayController = (() => {
  /**
   * Responsible for populate the game container with cells to create the UI.
   * @param {number} numOfRows - Represents the number of rows for the board to be created.
   * @param {number} numOfCols - Represents the number of columns for each row.
   * @memberof displayController
   */
  const createBoard = (numOfRows, numOfCols) => {
    const boardContainer = document.querySelector("#game-container");

    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
        const cell = document.createElement("button");
        cell.classList.add("game-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = "";
        boardContainer.appendChild(cell);
      }
    }
  };

  /**
   * Handles updating the UI board with players marker depending on the clicked cell.
   * @param {number} row - The selected row for the selected cell.
   * @param {number} col - The selected column for the selected cell.
   * @param {string} marker - The marker to be placed within the board on the UI.
   * @memberof displayController
   */
  const updateBoard = (row, col, marker) => {
    const selectedCell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`,
    );
    selectedCell.textContent = marker;
  };

  /**
   * Responsible for protecting and returning the game-container element safely.
   * @memberof displayController
   * @returns {Element} returns the game-container element safely.
   */
  const getBoardContainer = () => {
    const boardContainer = document.querySelector("#game-container");
    return boardContainer;
  };

  /**
   * Responsible for resetting the cells within game-container to reset the UI.
   * @memberof displayController
   */
  const resetDisplay = () => {
    const boardCells = document.querySelectorAll(".game-cell");
    boardCells.forEach((node, index) => {
      node.textContent = "";
    });
  };

  return { createBoard, updateBoard, getBoardContainer, resetDisplay };
})();

gameController();

// TODO:
// Should input validation be done in the game controller
// Would the game controller be responsible for managing the marker selection between two players or would it be random.
