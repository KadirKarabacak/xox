import { useState } from "react";
import "./index.css";

// LAYOUT
export default function App() {
  return (
    <div className="app">
      <Header />
      {/* <Replay /> */}
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

  function controlWinner() {
    const [...cells] = document.querySelectorAll(".grid-cell");

    if (winner) return;
    // Row Conditions "X"
    console.log(cells[0]?.textContent);
    const conditionRowX1 =
      cells[0]?.textContent === "X" &&
      cells[1]?.textContent === "X" &&
      cells[2]?.textContent === "X";
    const conditionRowX2 =
      cells[3]?.textContent === "X" &&
      cells[4]?.textContent === "X" &&
      cells[5]?.textContent === "X";
    const conditionRowX3 =
      cells[6]?.textContent === "X" &&
      cells[7]?.textContent === "X" &&
      cells[8]?.textContent === "X";
    // Column Conditions "X"
    const conditionColumnX1 =
      cells[0]?.textContent === "X" &&
      cells[3]?.textContent === "X" &&
      cells[6]?.textContent === "X";
    const conditionColumnX2 =
      cells[1]?.textContent === "X" &&
      cells[4]?.textContent === "X" &&
      cells[7]?.textContent === "X";
    const conditionColumnX3 =
      cells[2]?.textContent === "X" &&
      cells[5]?.textContent === "X" &&
      cells[8]?.textContent === "X";
    // Cross Conditions "X"
    const conditionCrossX1 =
      cells[0]?.textContent === "X" &&
      cells[4]?.textContent === "X" &&
      cells[8]?.textContent === "X";
    const conditionCrossX2 =
      cells[2]?.textContent === "X" &&
      cells[4]?.textContent === "X" &&
      cells[6]?.textContent === "X";
    ///////////////////////////////////////////////////////////////
    // Row Conditions "X"
    const conditionRowO1 =
      cells[0]?.textContent === "O" &&
      cells[1]?.textContent === "O" &&
      cells[2]?.textContent === "O";
    const conditionRowO2 =
      cells[3]?.textContent === "O" &&
      cells[4]?.textContent === "O" &&
      cells[5]?.textContent === "O";
    const conditionRowO3 =
      cells[6]?.textContent === "O" &&
      cells[7]?.textContent === "O" &&
      cells[8]?.textContent === "O";
    // Column Conditions "O"
    const conditionColumnO1 =
      cells[0]?.textContent === "O" &&
      cells[3]?.textContent === "O" &&
      cells[6]?.textContent === "O";
    const conditionColumnO2 =
      cells[1]?.textContent === "O" &&
      cells[4]?.textContent === "O" &&
      cells[7]?.textContent === "O";
    const conditionColumnO3 =
      cells[2]?.textContent === "O" &&
      cells[5]?.textContent === "O" &&
      cells[8]?.textContent === "O";
    // Cross Conditions "O"
    const conditionCrossO1 =
      cells[0]?.textContent === "O" &&
      cells[4]?.textContent === "O" &&
      cells[8]?.textContent === "O";
    const conditionCrossO2 =
      cells[2]?.textContent === "O" &&
      cells[4]?.textContent === "O" &&
      cells[6]?.textContent === "O";
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
      setWinner("X");
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
      setWinner("O");
    }
  }
  controlWinner();

  return (
    <div className="game-container">
      <div className="grid-container">
        {nums.map((num) => {
          // Then set props for child component to change content and player on each click.
          return (
            <GridCells
              winner={winner}
              onSetPlayer={setPlayer}
              player={player}
              key={num}
              num={num}
            />
          );
        })}
      </div>
      <Players winner={winner} player={player} />
    </div>
  );
}

function GridCells({ player, num, onSetPlayer, winner }) {
  const [content, setContent] = useState("X");
  //! Başlangıçta "" değeri verdiğim için ilk tıklamayı saymıyor. Çözmen lazım

  // Set content into button and change player
  function setContents() {
    if (content || winner) return;

    // Set content
    setContent(player);

    // Change player after click
    onSetPlayer(player === "X" ? "O" : "X");

    // Draw clause
    if (!winner && checkDraw()) {
      console.log("Berabere");
    }
  }

  // Draw
  function checkDraw() {
    const [...cells] = document.querySelectorAll(".grid-cell");
    return cells.every((cell) => cell.innerText);
  }

  return (
    <button num={num} onClick={setContents} className="grid-cell">
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
        Player <span className="player-turn">{winner}</span> is winner!
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

// function Replay() {
//   return <button className="replay-button">Replay</button>;
// }
