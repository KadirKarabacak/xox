import "./index.css";

// LAYOUT
export default function App() {
  return (
    <div className="app">
      <Header />
      <GridContainer />
    </div>
  );
}

function Header() {
  return <header className="header">XØX</header>;
}

function GridContainer() {
  return (
    <div className="game-container">
      <div className="grid-container">
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
        <GridCells />
      </div>
      <Players />
    </div>
  );
}

function GridCells() {
  return <button className="grid-cell">X</button>;
}

function Players() {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1 className="player-name">Player 1</h1>
        <span className="player-score">Score 1</span>
      </div>
      <div className="players">Player 1's turn</div>
      <div className="players player--2">
        <h1 className="player-name">Player 2</h1>
        <span className="player-score">Score 2</span>
      </div>
    </div>
  );
}

// FUNCTIONALITY
