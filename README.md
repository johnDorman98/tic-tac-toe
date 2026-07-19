# tic-tac-toe

## Project Overview

A simple web‑based Tic Tac Toe game implemented with JavaScript, HTML, and CSS. Players take turns marking a 3×3 grid to achieve three in a row. Features include score tracking, customisable player names, and game outcome notifications.

## Technical Architecture & Design Patterns

The application follows a modular architecture using Immediately Invoked Function Expressions (IIFEs) to encapsulate functionality. Responsibilities are separated into distinct controllers: `gameBoard` manages the game state, `player` handles player objects and scores, and `gameController` orchestrates game logic. The `displayController` manipulates the DOM, ensuring a clean separation of concerns and keeping the global scope clean.

## Features

- Score tracking for each player
- Customisable player names
- Game outcome notifications
- Responsive grid layout
- Uses the native HTML `<dialog>` element for modal windows
- Optimised dark‑theme styling with high‑contrast typography and multi‑layered text shadows for legibility
- Event delegation for efficient DOM interaction
- Full keyboard navigability with custom focus rings and programmatic focus restoration

## Getting Started

To run the project locally, you will need [Git](https://git-scm.com/) and a modern web browser (Chrome, Firefox, Edge, or Safari).

### 1. Clone the repository

```bash
git clone https://github.com/johnDorman98/tic-tac-toe
cd tic-tac-toe
```

### 2. Run the game

Because this is a static site with no build step or dependencies, you can open it directly:

- **Option A – Open the file:** Double‑click `index.html` or open it in your browser (`file://` path).
- **Option B – Local server (recommended):** From the project root, start any static server, for example:
  ```bash
  npx live-server
  ```
  or
  ```bash
  python3 -m http.server 8000
  ```
  Then visit `http://localhost:8000` (or the port shown).

### 3. Play

Once loaded, follow the **How to Play** section above. No further installation or configuration is required.

## How to Play

1. Two players (X and O) take turns clicking empty cells.
2. The first player to get three of their markers in a row (horizontal, vertical, or diagonal) wins.
3. If all cells are filled without a winner, the game ends in a draw.
4. Players can update their names during gameplay.
5. Use “Restart” to reset the game or “Play Again” after a game ends.

## Play the Game

Play the live game here: [https://johndorman98.github.io/tic-tac-toe/](https://johndorman98.github.io/tic-tac-toe/)

## Technologies Used

- JavaScript (ES6+)
- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

## License

[MIT](https://choosealicense.com/licenses/mit/)
