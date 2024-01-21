import { FC } from 'react';
import { possiblePawnCaptures } from '../../static-data/logic/pieces';
import { PieceButton, PieceDiagram } from './piece.styled';
import usePieces from '../hooks/usePieces';

interface PieceProps {
  imageUrl: string;
  position: string;
}

const Piece: FC<PieceProps> = ({ imageUrl, position }) => {
  const { data, selectPieceAt, capturePieceAt } = usePieces();
  const { allActivePieces } = data;
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');
  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const capturablePawn =
    selectedPiece &&
    possiblePawnCaptures(selectedPiece, allActivePieces).find(
      capturablePiece => capturablePiece.position === position,
    );

  return (
    <PieceButton
      $boardIndex={Number(position[1])}
      $isSelected={selectedPiece?.position === position}
      data-testid={selectedPiece?.position === position ? 'selected-piece' : ''}
      onClick={() =>
        capturablePawn ? capturePieceAt(position) : selectPieceAt(position)
      }
    >
      <PieceDiagram
        $possiblecapture={capturablePawn?.position ?? ''}
        alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess piece`}
        src={imageUrl}
      />
    </PieceButton>
  );
};

export default Piece;
