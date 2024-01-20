import styled from 'styled-components';

export const PieceButton = styled.button`
  background: transparent;
  border: transparent;
  padding: 5px;
`;

export const PieceDiagram = styled.img<{
  $possiblecapture: string;
}>`
  width: 100%;
  vertical-align: middle;
  background: ${props => (props.$possiblecapture ? 'rgb(158, 222, 131)' : '')};
  border-radius: ${props => (props.$possiblecapture ? '50%' : '')};
`;
