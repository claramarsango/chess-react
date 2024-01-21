import styled from 'styled-components';

export const BorderStyledContainer = styled.div<{ $isRowContainer: boolean }>`
  font-size: 10px;
  line-height: 24px;
  color: rgba(247, 238, 221, 0.92);

  grid-row: ${props => (props.$isRowContainer ? '2 / 3' : '')};
  grid-column: ${props => (!props.$isRowContainer ? '2 / 3' : '')};

  display: flex;
  flex-direction: ${props => (props.$isRowContainer ? 'column' : '')};
  justify-content: space-around;

  p {
    width: 24px;
  }
`;
