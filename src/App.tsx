import './App.css';
import Board from './Board/Board';

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
        <Board />
      </main>
    </>
  );
};

export default App;
