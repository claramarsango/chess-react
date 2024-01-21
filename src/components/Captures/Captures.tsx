import { FC } from 'react';
import { PieceModel } from '../../static-data/types';
import Piece from '../Piece/Piece';
import { CapturesContainer } from './captures.styled';

interface CapturesProps {
  children: PieceModel[];
}

const Captures: FC<CapturesProps> = ({ children }) => {
  return (
    <CapturesContainer $capturedpiece={children[0]?.player}>
      {children.map(piece => (
        <Piece
          key={globalThis.crypto.randomUUID()}
          imageUrl={piece.diagram}
          position={piece.position}
        />
      ))}
    </CapturesContainer>
  );
};

export default Captures;
