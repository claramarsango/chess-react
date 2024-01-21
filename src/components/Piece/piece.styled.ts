import styled from 'styled-components';
import { BoardSquare } from '../../styles/shared/shared-components.styled';

export const PieceButton = styled(BoardSquare)<{ $isSelected: boolean }>`
  border: ${props => (props.$isSelected ? '1px solid red' : '0')};
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
