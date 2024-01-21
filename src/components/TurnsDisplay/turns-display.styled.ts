import styled from 'styled-components';

export const TurnsDisplayContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 25%;
  width: 50%;
  max-width: 275px;
`;

export const StyledTurnFigure = styled.div<{ $hasTurn: boolean }>`
  width: 20%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  padding: 2%;
  background: ${props => (props.$hasTurn ? 'rgba(236, 203, 141, 0.804)' : '')};

  img {
    width: 100%;
  }
`;
