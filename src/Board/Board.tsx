import Square from '../Square/Square';
import './board-styled.css';
import BoardBorder from '../BoardBorder/BoardBorder';
import { COLUMNS, DARK_TEAM, LIGHT_TEAM, ROWS } from '../constants';

const buildBoard = (rows: number[], columns: string[]) => {
  const completeBoard = [];

  for (const rowId of rows) {
    for (const columnId of columns) {
      completeBoard.push([columnId, rowId]);
    }
  }

  return completeBoard;
};

const Board = () => {
  const board = buildBoard(ROWS, COLUMNS);

  return (
    <section className="board-container">
      <BoardBorder>{ROWS}</BoardBorder>

      <div className="board__central-section">
        <BoardBorder>{COLUMNS}</BoardBorder>
        <section className="board__squares-container">
          {board.map(square => (
            <Square
              key={square.join('')}
              position={square}
              lightTeam={LIGHT_TEAM}
              darkTeam={DARK_TEAM}
            />
          ))}
        </section>
        <BoardBorder>{COLUMNS}</BoardBorder>
      </div>

      <BoardBorder>{ROWS}</BoardBorder>
    </section>
  );
};

export default Board;
