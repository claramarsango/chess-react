import { useContext } from 'react';
import './App.css';
import Board from './components/Board/Board';
import TurnsDisplay from './components/TurnsDisplay/TurnsDisplay';
import PiecesContext from './store/context/chessApp.context';
import Captures from './components/Captures/Captures';
import { COLOURS } from './static-data/types';
import Footer from './components/Footer/Footer';

const App = () => {
  const { data } = useContext(PiecesContext);
  const { capturedPieces } = data;

  return (
    <>
      <header className="header">
        <h1>Chess</h1>
      </header>
      <main className="game-container">
        <TurnsDisplay />
        <section className="game__match-container">
          <Captures>
            {capturedPieces.filter(piece => piece.player === COLOURS.BLACK)}
          </Captures>
          <Board />
          <Captures>
            {capturedPieces.filter(piece => piece.player === COLOURS.WHITE)}
          </Captures>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default App;
