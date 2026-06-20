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

// Factory function to handle the creation of Player objects.
const player = (name, marker) => {
  let score = 0;

  // Methods for managing attributes.
  getScore = () => {
    return score;
  };

  incrementScore = () => {
    score++;
  };

  return { name, marker, getScore, incrementScore };
};

// Factory function for the game logic
const gameController = () => {
  const checkThreeInRow = (marker, boardToCheck) => {
    // Check for three in a row horizontally.
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

  const checkThreeInColumn = (marker, boardToCheck) => {
    // Check for three in a row vertically.
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

  // Check for diagonal three in a row, returning the true if found.
  const checkDiagonalWin = (marker, boardToCheck) => {
    let diagonalWin = true;

    // Top-left to bottom-right diagonal check for three in a row.
    for (let i = 0; i < boardToCheck.length; i++) {
      if (boardToCheck[i][i] !== marker) {
        diagonalWin = false;
        break;
      }
    }

    // Early return if three in row found top-left to bottom-right.
    if (diagonalWin) {
      return diagonalWin;
    } else {
      // Reset for top-right to bottom-left diagonal check.
      diagonalWin = true;

      // Top-right to bottom-left diagonal check for three in a row.
      for (let i = 0; i < boardToCheck.length; i++) {
        // Control column to check for top-right to bottom-left.
        let colToCheck = 2 - i;

        if (boardToCheck[i][colToCheck] !== marker) {
          diagonalWin = false;
          break;
        }
      }
    }

    return diagonalWin;
  };

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

  const board = gameBoard;
  const { rows, cols } = board.getBoardSize();
  const display = displayController;
  const boardContainerElement = display.getBoardContainer();
  display.createBoard(rows, cols);

  const player1 = player("Player1", "X");
  const player2 = player("Player2", "O");
  let currentPlayer = player1;

  let isGameOver = false;

  const resetButtonElement = document.querySelector('button[type="reset"]');
  const outcomeModal = document.querySelector("#game-outcome-modal");
  const outcomeFeedback = document.querySelector("#game-outcome");
  const outcomeModalClose = document.querySelector("#game-outcome-close");

  boardContainerElement.addEventListener("click", (event) => {
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

  outcomeModalClose.addEventListener("click", () => {
    outcomeModal.close();
  });

  resetButtonElement.addEventListener("click", () => {
    board.resetBoard();
    display.resetDisplay();
    currentPlayer = player1;
    isGameOver = false;
    outcomeFeedback.textContent = "";
  });
};

const displayController = (() => {
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

  const updateBoard = (row, col, marker) => {
    const selectedCell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`,
    );
    selectedCell.textContent = marker;
  };

  const getBoardContainer = () => {
    const boardContainer = document.querySelector("#game-container");
    return boardContainer;
  };

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
