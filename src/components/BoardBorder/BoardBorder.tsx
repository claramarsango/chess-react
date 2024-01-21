import { FC } from 'react';
import { BorderStyledContainer } from './board-border.styled';

interface BoardBorderProps {
  children: (number | string)[];
}

const BoardBorder: FC<BoardBorderProps> = ({ children }) => {
  return (
    <BorderStyledContainer $isRowContainer={typeof children[0] === 'number'}>
      {children.map(element => (
        <p key={element}>{element}</p>
      ))}
    </BorderStyledContainer>
  );
};

export default BoardBorder;
