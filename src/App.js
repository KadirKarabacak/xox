import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.css";

// Header
function Header() {
  return <header className="header">XØX</header>;
}

// Replay button clears area
function Replay({ onReset }) {
  return (
    <button onClick={onReset} type="reset" className="replay-button">
      Replay
    </button>
  );
}

// Grid container
export default function App() {
  // [null, null, null, null, null, null, null, null, null]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);

  // Score states
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  // Updates ScoreX
  function handleScoreX() {
    setScoreX((score) => score + 1);
  }

  // Updates ScoreO
  function handleScoreO() {
    setScoreO((score) => score + 1);
  }

  // To render buttons 9 time
  const nums = Array.from({ length: 9 }, (_, i) => i);

  // Clicked button with num prop
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

  // To avoid infinite loop using out of the if block
  useEffect(() => {
    // Use useEffect to update scores after each render
    if (winner) {
      // If any winner
      winner === "X" ? handleScoreX() : handleScoreO();
    }
  }, [winner]);

  // Reset function
  function handleReset() {
    setSquares(Array(9).fill(null));
    setPlayer(true);
  }

  function handleCloseModal() {
    setScoreO(0);
    setScoreX(0);
  }

  return (
    <div className="app">
      {(scoreX === 5 || scoreO === 5) && (
        <WinnerModal
          winner={winner}
          handleCloseModal={handleCloseModal}
          handleReset={handleReset}
        />
      )}
      <div className="header-replay">
        <Header />
        <Replay onReset={handleReset} />
      </div>
      <div className="game-container">
        <div className="grid-container">
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
          {/* Creates 9 buttons also "values" equals "nums" */}
        </div>
        {/* Change the content */}
        <Players
          scoreO={scoreO}
          scoreX={scoreX}
          winner={winner}
          status={status}
          player={player}
        />
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
function Players({ status, scoreX, scoreO }) {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1 className={`player-name ${status === "X" ? "active" : ""}`}>
          Player X
        </h1>
        <span className="player-score">
          Score <i class="fa-solid fa-star"></i> {scoreX}
        </span>
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
        <span className="player-score">
          Score <i class="fa-solid fa-star"></i> {scoreO}
        </span>
      </div>
    </div>
  );
}

// Modal for winner situation
function WinnerModal({ handleCloseModal, handleReset, winner }) {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    handleCloseModal();
    handleReset();
  }
  return (
    <>
      {isOpen && (
        <TransitionGroup className="modal-overlay" onClick={closeModal}>
          <CSSTransition
            in={isOpen}
            appear={true}
            timeout={300} // Animasyon süresi (ms)
            classNames="modal"
            unmountOnExit
          >
            <div className="modal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="modal-content">
                <p className="modal-text">
                  Winner <span className="winner-name">{winner}</span>
                </p>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    </>
  );
}
