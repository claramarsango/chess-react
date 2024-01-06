import { useContext } from 'react';
import './turns-display-styled.css';
import PiecesContext from '../../store/context/chessApp.context';
import { COLOURS } from '../../static-data/types';

const TurnsDisplay = () => {
  const { data } = useContext(PiecesContext);

  return (
    <section className="turns-container">
      <div
        className={`turns__turn ${
          data.turn === COLOURS.WHITE ? 'turn--selected' : ''
        }`}
      >
        <img
          src="./assets/chess-pieces/white/white-knight.png"
          alt="white turn pawn diagram"
        />
      </div>

      <div
        className={`turns__turn ${
          data.turn === COLOURS.BLACK ? 'turn--selected' : ''
        }`}
      >
        <img
          src="./assets/chess-pieces/black/black-knight.png"
          alt="white turn pawn diagram"
        />
      </div>
    </section>
  );
};

export default TurnsDisplay;
