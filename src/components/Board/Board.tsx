import EmptySquare from '../EmptySquare/EmptySquare';
import BoardBorder from '../BoardBorder/BoardBorder';
import { COLUMNS, ROWS, BOARD } from '../../static-data/constants';
import { useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import Piece from '../Piece/Piece';
import { BoardStyledContainer } from './board.styled';

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
    <BoardStyledContainer>
      <BoardBorder>{ROWS}</BoardBorder>
      <BoardBorder>{COLUMNS}</BoardBorder>
      <section className="board__squares-container">
        {BOARD.map(position => renderElementDependingOn(position))}
      </section>
      <BoardBorder>{COLUMNS}</BoardBorder>
      <BoardBorder>{ROWS}</BoardBorder>
    </BoardStyledContainer>
  );
};

export default Board;
