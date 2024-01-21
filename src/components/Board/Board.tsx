import EmptySquare from '../EmptySquare/EmptySquare';
import './board-styled.css';
import BoardBorder from '../BoardBorder/BoardBorder';
import { COLUMNS, ROWS, BOARD } from '../../static-data/constants';
import { useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import Piece from '../Piece/Piece';

const Board = () => {
  const { data } = useContext(PiecesContext);
  const { allActivePieces } = data;

  const renderElementDependingOn = (positionOnBoard: string) => {
    const pieceInsideSquare = allActivePieces.find(
      piece => piece.position === positionOnBoard,
    );

    return pieceInsideSquare ? (
      <Piece
        key={positionOnBoard}
        imageUrl={pieceInsideSquare.diagram}
        position={positionOnBoard}
      />
    ) : (
      <EmptySquare squarePosition={positionOnBoard} key={positionOnBoard} />
    );
  };

  return (
    <section className="board-container">
      <BoardBorder>{ROWS}</BoardBorder>
      <div className="board__central-section">
        <BoardBorder>{COLUMNS}</BoardBorder>
        <section className="board__squares-container">
          {BOARD.map(position => renderElementDependingOn(position))}
        </section>
        <BoardBorder>{COLUMNS}</BoardBorder>
      </div>
      <BoardBorder>{ROWS}</BoardBorder>
    </section>
  );
};

export default Board;
