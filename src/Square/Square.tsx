import { FC } from 'react';
import './square-styled.css';
import { PieceModel } from '../static-data/types';
import Piece from '../Piece/Piece';
import { BLACKS, WHITES } from '../static-data/constants';

interface SquareProps {
  position: (string | number)[];
}

const Square: FC<SquareProps> = ({ position }) => {
  const populateBoardWith = (...allPlayersPieces: PieceModel[][]) => {
    for (const playerPieces of allPlayersPieces) {
      for (const piece of playerPieces) {
        if (piece.position.toString() === position.toString())
          return (
            <Piece key={piece.position.toString()} imageUrl={piece.diagram} />
          );
      }
    }
  };

  return (
    <div
      className={`board__square ${
        (position[1] as number) % 2 === 0
          ? 'square__even-row'
          : 'square__odd-row'
      }`}
    >
      {populateBoardWith(WHITES, BLACKS)}
    </div>
  );
};

export default Square;
