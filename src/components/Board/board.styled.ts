import styled from 'styled-components';

export const BoardStyledContainer = styled.section`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-rows: 24px 1fr 24px;

  background: rgba(45, 28, 16, 0.94);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.529);
  border-radius: 0.25rem;

  .board__squares-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    width: 100%;
    aspect-ratio: 1/1;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.364);
  }
`;
