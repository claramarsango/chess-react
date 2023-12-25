import { useEffect, useState } from 'react';
import Square from '../Square/Square';
import './board-styled.css';
import BoardBorder from '../BoardBorder/BoardBorder';

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROWS = Array.from({ length: 8 }, (_, index) => index + 1).reverse();

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
  const [board, setBoard] = useState([['', 0]]);

  useEffect(() => {
    setBoard(buildBoard(ROWS, COLUMNS));
  }, [setBoard]);

  return (
    <section className="board-container">
      <BoardBorder>{ROWS}</BoardBorder>

      <div className="board__central-section">
        <BoardBorder>{COLUMNS}</BoardBorder>
        <section className="board__squares-container">
          {board.map(square => (
            <Square key={square.join('')} position={square} />
          ))}
        </section>
        <BoardBorder>{COLUMNS}</BoardBorder>
      </div>

      <BoardBorder>{ROWS}</BoardBorder>
    </section>
  );
};

export default Board;
