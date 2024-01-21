import styled from 'styled-components';
import { COLOURS } from '../../static-data/types';

export const CapturesContainer = styled.section<{ $capturedpiece: COLOURS }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: ${props =>
    props.$capturedpiece === COLOURS.BLACK ? 'end' : ''};

  && button {
    padding: 0;
    background: initial;
    box-shadow: initial;
  }
`;
