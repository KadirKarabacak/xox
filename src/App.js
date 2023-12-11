import "./index.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <GridContainer />
    </div>
  );
}

function Header() {
  return <header className="header">XOX Game</header>;
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
  return <div className="grid-cell">X</div>;
}

function Players() {
  return (
    <div className="players-container">
      <div className="players player--1">
        <h1>Player 1</h1>
        <span>Score 1</span>
      </div>
      <div className="players player--2">
        <h1>Player 2</h1>
        <span>Score 2</span>
      </div>
    </div>
  );
}
