import { useState } from "react";
import "./index.css";

// FUNCTIONALITY
// const player1 = "X";
// const player2 = "O";

//! OLASI DURUMLAR :
// 1: useState("X") kullanarak default oyuncuyu X yap, her X girildiğinde oyuncuyu O'ya çevir.
// 2: const [content, setContent] useState("") kullanarak buton içeriğini oyuncunun içeriğine ayarla.

// LAYOUT
export default function App() {
  return (
    <div className="app">
      <Header />
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
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [player, setPlayer] = useState("X");

  // Defining it on container to update whole ui to change player. Otherwise it changes only for one cell
  function setPlayers() {
    setPlayer(player === "X" ? "O" : "X");
  }
  return (
    <div className="game-container">
      <div className="grid-container">
        {nums.map((num) => {
          // Then set props for child component to change content and player on each click.
          return (
            <GridCells setPlayers={setPlayers} player={player} number={num} />
          );
        })}
      </div>
      <Players />
    </div>
  );
}

function GridCells({ num, player, setPlayers }) {
  //! If we define player change here, it updates only one cell because state is isolated for each comp
  // const [player, setPlayer] = useState("X");
  const [content, setContent] = useState(null);

  // Set content into button and change player
  function setContents() {
    setPlayers();
    setContent(player);
  }

  return (
    <button onClick={setContents} className="grid-cell">
      {content}
    </button>
  );
}

// Container holds player names and scores.
function Players() {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1 className="player-name">Player X</h1>
        <span className="player-score">Score 1</span>
      </div>
      <div className="players">Player 1's turn</div>
      <div className="players player--2">
        <h1 className="player-name">Player O</h1>
        <span className="player-score">Score 2</span>
      </div>
    </div>
  );
}
