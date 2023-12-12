import { useState } from "react";
import "./index.css";

// LAYOUT
export default function App() {
  return (
    <div className="app">
      <Header />
      <Replay />
      <GridContainer />
    </div>
  );
}

// Header
function Header() {
  return <header className="header">XØX</header>;
}

function GridContainer() {
  // Each cell has different num, so i can try to check win and draw possibility
  const nums = Array.from({ length: 9 }, (_, i) => i + 1);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  function checkWinner() {
    const [...cells] = document.querySelectorAll(".grid-cell");

    // Row Conditions "X"
    const conditionRowX1 =
      cells[0].innerText === "X" &&
      cells[1].innerText === "X" &&
      cells[2].innerText === "X";

    const conditionRowX2 =
      cells[3].innerText === "X" &&
      cells[4].innerText === "X" &&
      cells[5].innerText === "X";

    const conditionRowX3 =
      cells[6].innerText === "X" &&
      cells[7].innerText === "X" &&
      cells[8].innerText === "X";

    // Column Conditions "X"
    const conditionColumnX1 =
      cells[0].innerText === "X" &&
      cells[3].innerText === "X" &&
      cells[6].innerText === "X";

    const conditionColumnX2 =
      cells[1].innerText === "X" &&
      cells[4].innerText === "X" &&
      cells[7].innerText === "X";

    const conditionColumnX3 =
      cells[2].innerText === "X" &&
      cells[5].innerText === "X" &&
      cells[8].innerText === "X";

    // Cross Conditions "X"
    const conditionCrossX1 =
      cells[0].innerText === "X" &&
      cells[4].innerText === "X" &&
      cells[8].innerText === "X";

    const conditionCrossX2 =
      cells[2].innerText === "X" &&
      cells[4].innerText === "X" &&
      cells[6].innerText === "X";

    ///////////////////////////////////////////////////////////////

    // Row Conditions "X"
    const conditionRowO1 =
      cells[0].innerText === "O" &&
      cells[1].innerText === "O" &&
      cells[2].innerText === "O";

    const conditionRowO2 =
      cells[3].innerText === "O" &&
      cells[4].innerText === "O" &&
      cells[5].innerText === "O";

    const conditionRowO3 =
      cells[6].innerText === "O" &&
      cells[7].innerText === "O" &&
      cells[8].innerText === "O";

    // Column Conditions "O"
    const conditionColumnO1 =
      cells[0].innerText === "O" &&
      cells[3].innerText === "O" &&
      cells[6].innerText === "O";

    const conditionColumnO2 =
      cells[1].innerText === "O" &&
      cells[4].innerText === "O" &&
      cells[7].innerText === "O";

    const conditionColumnO3 =
      cells[2].innerText === "O" &&
      cells[5].innerText === "O" &&
      cells[8].innerText === "O";

    // Cross Conditions "O"
    const conditionCrossO1 =
      cells[0].innerText === "O" &&
      cells[4].innerText === "O" &&
      cells[8].innerText === "O";

    const conditionCrossO2 =
      cells[2].innerText === "O" &&
      cells[4].innerText === "O" &&
      cells[6].innerText === "O";

    if (
      conditionRowX1 ||
      conditionRowX2 ||
      conditionRowX3 ||
      conditionColumnX1 ||
      conditionColumnX2 ||
      conditionColumnX3 ||
      conditionCrossX1 ||
      conditionCrossX2
    ) {
      console.log("Winner X");
    }

    if (
      conditionRowO1 ||
      conditionRowO2 ||
      conditionRowO3 ||
      conditionColumnO1 ||
      conditionColumnO2 ||
      conditionColumnO3 ||
      conditionCrossO1 ||
      conditionCrossO2
    ) {
      console.log("Winner O");
    }
  }

  // Defining it on container to update whole ui to change player. Otherwise it changes only for one cell
  function changePlayers() {
    checkWinner();
    setPlayer(player === "X" ? "O" : "X");
  }

  return (
    <div className="game-container">
      <div className="grid-container">
        {nums.map((num) => {
          // Then set props for child component to change content and player on each click.
          return (
            <GridCells
              checkWinner={checkWinner}
              changePlayer={changePlayers}
              player={player}
              number={num}
            />
          );
        })}
      </div>
      <Players player={player} winner={winner} />
    </div>
  );
}

function GridCells({ number, player, changePlayer, checkWinner }) {
  //! If we define player change here, it updates only one cell because state is isolated for each comp
  // const [player, setPlayer] = useState("X");
  const [content, setContent] = useState(null);

  // Set content into button and change player
  function setContents() {
    setContent(player);
    changePlayer();
    checkWinner();
  }

  return (
    <button number={number} onClick={setContents} className="grid-cell">
      {content}
    </button>
  );
}

// Container holds player names and scores.
function Players({ player, winner }) {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1 className={`player-name ${player === "X" ? "active" : ""}`}>
          Player X
        </h1>
        <span className="player-score">Score: </span>
      </div>
      <div className="players">
        Player <span className="player-turn">{player}</span>'s turn
      </div>
      <div className="players player--2">
        <h1 className={`player-name ${player === "O" ? "active" : ""}`}>
          Player O
        </h1>
        <span className="player-score">Score: </span>
      </div>
    </div>
  );
}

function Replay() {
  return <button className="replay-button">Replay</button>;
}
