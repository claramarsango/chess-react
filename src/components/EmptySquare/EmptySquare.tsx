import { FC, useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import { possiblePawnMoves } from '../../static-data/logic/pieces';
import { ACTION_TYPES, PieceModel } from '../../static-data/types';
import { BoardSquare } from '../../styles/shared/shared-components.styled';
import { PossibleMoveHighlight } from './empty-square.styled';

interface EmptySquareProps {
  squarePosition: string;
}

const EmptySquare: FC<EmptySquareProps> = ({ squarePosition }) => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces } = data;

  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const possibleMove =
    selectedPiece &&
    possiblePawnMoves(selectedPiece, allActivePieces).find(
      possibleNewPosition => possibleNewPosition === squarePosition,
    );

  const handleClick = (newPosition: string, currentPiece: PieceModel) => {
    // exits if the new selected position doesn't match with the pawn's possible moves
    if (
      currentPiece &&
      !possiblePawnMoves(currentPiece, allActivePieces).find(
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
    <BoardSquare
      $boardIndex={Number(squarePosition[1])}
      onClick={() =>
        selectedPiece && handleClick(squarePosition, selectedPiece)
      }
      data-testid={'empty-square'}
    >
      {possibleMove ? (
        <PossibleMoveHighlight data-testid={'possible-move'} />
      ) : (
        ''
      )}
    </BoardSquare>
  );
};

export default EmptySquare;
