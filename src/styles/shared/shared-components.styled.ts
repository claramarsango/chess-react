import styled from 'styled-components';

export const BoardSquare = styled.button<{ $boardIndex: number }>`
  display: flex;
  border: 0;
  box-shadow: 0px 0px 3px inset rgba(59, 27, 12, 0.648);
  aspect-ratio: 1/1;
  background: ${props =>
    props.$boardIndex % 2 === 0
      ? 'rgba(88, 46, 16, 0.716)'
      : 'rgba(236, 203, 141, 0.804)'};

  &:nth-child(even) {
    background: ${props =>
      props.$boardIndex % 2 === 0
        ? 'rgba(236, 203, 141, 0.804)'
        : 'rgba(88, 46, 16, 0.716)'};
  }
`;
