import { useState } from "react";
import "./index.css";
// LAYOUT
// export default function App() {
//   return (
//     // <div className="app">
//     //   <Header />
//     //   <GridContainer />
//     // </div>
//   );
// }

// Header
function Header() {
  return <header className="header">XØX</header>;
}

// Grid container
export default function App() {
  // [null, null, null, null, null, null, null, null, null]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);

  // To render buttons 9 time
  // [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const nums = Array.from({ length: 9 }, (_, i) => i);

  // Clicked button dedect with num prop
  function handleClick(i) {
    // If already clicked or a winner, do nothing.
    if (squares[i] || calculateWinner(squares)) return;
    // Copying squares
    const nextSquares = squares.slice();
    if (player) {
      // value={squares[num]} ->
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Each time creates new copied array
    setSquares(nextSquares);

    // Set player to opposite
    setPlayer(!player);
  }

  // Calculate winner by check lines.
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      // To check each line at row column or cross
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        //: To do scores

        // Return X or O by equality.
        return squares[a];
      }
    }
    // Otherwise return null to continue playing.
    return null;
  }

  // The result is null or "X" || "O"
  const winner = calculateWinner(squares);
  let status;
  const draw = squares.every((e) => e !== null);
  if (winner) {
    // If any winner
    status = "Winner " + winner;
  } else {
    if (draw) status = "Draw";
    // Else change player
    else {
      status = player ? "X" : "O";
    }
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setPlayer(true);
  }

  return (
    <div className="app">
      <div className="header-replay">
        <Header />
        <Replay onReset={handleReset} />
      </div>
      <div className="game-container">
        <div className="grid-container">
          {/* Creates 9 buttons also "values" equals "nums" */}
          {nums.map((num) => {
            return (
              <GridCells
                winner={winner}
                onSquareClick={() => handleClick(num)}
                value={squares[num]}
                key={num}
              />
            );
          })}
        </div>
        {/* Change the content */}
        <Players status={status} player={player} />
      </div>
    </div>
  );
}

// Buttons
function GridCells({ value, onSquareClick, winner }) {
  const winnerClass = "grid-cell-winner";
  return (
    <button
      onClick={onSquareClick}
      className={`grid-cell ${value === winner && winner ? winnerClass : ""} ${
        value ? "grid-cell-blocked" : ""
      }`}
    >
      {value}
    </button>
  );
}

// Container holds player names and scores.
function Players({ status }) {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1 className={`player-name ${status === "X" ? "active" : ""}`}>
          Player X
        </h1>
        <span className="player-score">Score: </span>
      </div>
      <div className="players">
        <span className="player-turn">
          {status === "X" || status === "O" ? status + "'s turn" : status}
        </span>
      </div>
      <div className="players player--2">
        <h1 className={`player-name ${status === "O" ? "active" : ""}`}>
          Player O
        </h1>
        <span className="player-score">Score: </span>
      </div>
    </div>
  );
}

function Replay({ onReset }) {
  return (
    <button onClick={onReset} type="reset" className="replay-button">
      Replay
    </button>
  );
}
