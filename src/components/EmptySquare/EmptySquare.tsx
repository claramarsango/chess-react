import { FC } from 'react';
import { BoardSquare } from '../../styles/shared/shared-components.styled';
import { PossibleMoveHighlight } from './empty-square.styled';
import usePieces from '../hooks/usePieces';
import { possibleMovesFrom } from '../../static-data/logic/pieces/shared';

interface EmptySquareProps {
  squarePosition: string;
}

const EmptySquare: FC<EmptySquareProps> = ({ squarePosition }) => {
  const { data, movePiece } = usePieces();
  const { allActivePieces } = data;

  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const possibleMove =
    selectedPiece &&
    possibleMovesFrom(selectedPiece, allActivePieces)?.find(
      possibleNewPosition => possibleNewPosition === squarePosition,
    );

  return (
    <BoardSquare
      $boardIndex={Number(squarePosition[1])}
      onClick={() => selectedPiece && movePiece(selectedPiece, squarePosition)}
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
