import Square from '../Square/Square';
import './board-styled.css';
import BoardBorder from '../BoardBorder/BoardBorder';
import { COLUMNS, ROWS, BOARD } from '../../static-data/constants';

const Board = () => {
  return (
    <section className="board-container">
      <BoardBorder>{ROWS}</BoardBorder>

      <div className="board__central-section">
        <BoardBorder>{COLUMNS}</BoardBorder>
        <section className="board__squares-container">
          {BOARD.map(square => (
            <Square key={square} squarePosition={square} />
          ))}
        </section>
        <BoardBorder>{COLUMNS}</BoardBorder>
      </div>
      <BoardBorder>{ROWS}</BoardBorder>
    </section>
  );
};

export default Board;
