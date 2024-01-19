import { FC } from 'react';
import './captures-styled.css';
import { COLOURS, PieceModel } from '../../static-data/types';
import Piece from '../Piece/Piece';

interface CapturesProps {
  children: PieceModel[];
}

const Captures: FC<CapturesProps> = ({ children }) => {
  return (
    <section
      className={`captured-pieces-container ${
        children[0]?.player === COLOURS.BLACK ? 'captured--align-bottom' : ''
      }`}
    >
      {children.map(piece => (
        <Piece
          key={piece.position}
          imageUrl={piece.diagram}
          position={piece.position}
        />
      ))}
    </section>
  );
};

export default Captures;
