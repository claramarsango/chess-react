import { FC, useContext } from 'react';
import './square-styled.css';
import Piece from '../Piece/Piece';
import PiecesContext from '../../store/context/chessApp.context';
import { possiblePawnMoves } from '../../static-data/logic/pieces';
import { ACTION_TYPES, PieceModel } from '../../static-data/types';

interface SquareProps {
  squarePosition: string;
}

const Square: FC<SquareProps> = ({ squarePosition }) => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces } = data;

  const selectedPiece = allActivePieces.find(piece => piece.isSelected);

  const renderElementDependingOn = (squarePositionOnBoard: string) => {
    const pieceInsideSquare = allActivePieces.find(
      piece => piece.position === squarePositionOnBoard,
    );

    return pieceInsideSquare ? (
      <Piece
        key={squarePositionOnBoard}
        imageUrl={pieceInsideSquare.diagram}
        position={squarePositionOnBoard}
      />
    ) : (
      <button
        className="square__empty"
        onClick={() =>
          selectedPiece && handleClick(squarePositionOnBoard, selectedPiece)
        }
        data-testid="empty-square"
      >
        <div
          className={
            selectedPiece &&
            showPossibleMoves(selectedPiece, squarePositionOnBoard)
          }
          data-testid={
            selectedPiece &&
            showPossibleMoves(selectedPiece, squarePositionOnBoard)
          }
        ></div>
      </button>
    );
  };

  const showPossibleMoves = (pieceToMove: PieceModel, newSquare: string) => {
    return possiblePawnMoves(pieceToMove).find(
      possibleNewPosition => possibleNewPosition === newSquare,
    )
      ? 'square--possible-move'
      : '';
  };

  const highlightSelectedSquare = (selectedSquare: string) => {
    return selectedPiece && selectedPiece.position === selectedSquare
      ? 'square--isSelected'
      : '';
  };

  const handleClick = (newPosition: string, currentPiece: PieceModel) => {
    // exits if no pieces are selected
    if (allActivePieces.every(piece => !piece.isSelected)) return;
    // exits if the new selected position doesn't match with the pawn's possible moves
    if (
      currentPiece &&
      !possiblePawnMoves(currentPiece).find(
        possiblePosition => possiblePosition === newPosition,
      )
    )
      return;

    dispatch({
      type: ACTION_TYPES.MOVED_PIECE,
      payload: newPosition,
    });
  };

  return (
    <div
      className={`board__square ${
        Number(squarePosition[1]) % 2 === 0
          ? 'square__even-row'
          : 'square__odd-row'
      } ${highlightSelectedSquare(squarePosition)}`}
      data-testid={highlightSelectedSquare(squarePosition)}
    >
      {renderElementDependingOn(squarePosition)}
    </div>
  );
};

export default Square;
