import { FC } from 'react';
import { PieceButton, PieceDiagram } from './piece.styled';
import usePieces from '../hooks/usePieces';
import { possibleCapturesFrom } from '../../static-data/logic/pieces/shared';

interface PieceProps {
  imageUrl: string;
  position: string;
}

const Piece: FC<PieceProps> = ({ imageUrl, position }) => {
  const { data, selectPieceAt, capturePieceAt } = usePieces();
  const { allActivePieces } = data;
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');
  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const capturablePiece =
    selectedPiece &&
    possibleCapturesFrom(selectedPiece, allActivePieces).find(
      piece => piece?.position === position,
    );

  return (
    <PieceButton
      $boardIndex={Number(position[1])}
      $isSelected={selectedPiece?.position === position}
      data-testid={selectedPiece?.position === position ? 'selected-piece' : ''}
      onClick={() =>
        capturablePiece ? capturePieceAt(position) : selectPieceAt(position)
      }
    >
      <PieceDiagram
        $possiblecapture={capturablePiece?.position ?? ''}
        alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess piece`}
        src={imageUrl}
      />
    </PieceButton>
  );
};

export default Piece;
