import './App.css';
import Board from './components/Board/Board';
import TurnsDisplay from './components/TunsDisplay/TurnsDisplay';

const App = () => {
  return (
    <>
      <header className="header">
        <h1>Chess</h1>
      </header>
      <main className="game-container">
        <section className="game__progress-message">
          <h3>🚧 ...Under construction... 🚧</h3>
          <p>Thanks for stopping by! 🦦</p>
        </section>
        <section className="game__match-container">
          <TurnsDisplay />
          <Board />
        </section>
      </main>
    </>
  );
};

export default App;
