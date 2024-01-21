import { useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import { COLOURS } from '../../static-data/types';
import {
  StyledTurnFigure,
  TurnsDisplayContainer,
} from './turns-display.styled';

const TurnsDisplay = () => {
  const { data } = useContext(PiecesContext);

  return (
    <TurnsDisplayContainer>
      <StyledTurnFigure $hasTurn={data.turn === COLOURS.WHITE}>
        <img
          src="./assets/chess-pieces/white/white-knight.png"
          alt="white turn pawn diagram"
        />
      </StyledTurnFigure>

      <StyledTurnFigure $hasTurn={data.turn === COLOURS.BLACK}>
        <img
          src="./assets/chess-pieces/black/black-knight.png"
          alt="white turn pawn diagram"
        />
      </StyledTurnFigure>
    </TurnsDisplayContainer>
  );
};

export default TurnsDisplay;
