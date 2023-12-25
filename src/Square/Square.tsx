import { FC } from 'react';
import './square-styled.css';

interface SquareProps {
  position: (string | number)[];
}

const Square: FC<SquareProps> = ({ position }) => {
  return (
    <div
      className={`board__square ${
        (position[1] as number) % 2 === 0
          ? 'square__even-row'
          : 'square__odd-row'
      }`}
    ></div>
  );
};

export default Square;
