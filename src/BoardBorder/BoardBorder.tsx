import { FC } from 'react';
import './board-border-styled.css';

interface BoardBorderProps {
  children: (number | string)[];
}

const BoardBorder: FC<BoardBorderProps> = ({ children }) => {
  return (
    <div
      className={`board__border ${
        typeof children[0] === 'string'
          ? 'border__horizontal'
          : 'border__vertical'
      }`}
    >
      <div className="filler">/</div>

      <div className="border__text">
        {children.map(element => (
          <p className="border__square" key={element}>
            {element}
          </p>
        ))}
      </div>

      <div className="filler">/</div>
    </div>
  );
};

export default BoardBorder;
