import { FC } from 'react';
import './square-styled.css';
import { FigureModel } from '../models';
import Figure from '../Figure/Figure';

interface SquareProps {
  position: (string | number)[];
  lightTeam: FigureModel[];
  darkTeam: FigureModel[];
}

const Square: FC<SquareProps> = ({ position, lightTeam, darkTeam }) => {
  const setUpTeams = (...teams: FigureModel[][]) => {
    for (const team of teams) {
      for (const figure of team) {
        if (figure.position.toString() === position.toString())
          return (
            <Figure
              key={figure.position.toString()}
              imageUrl={figure.diagram}
            />
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
      {setUpTeams(darkTeam, lightTeam)}
    </div>
  );
};

export default Square;
