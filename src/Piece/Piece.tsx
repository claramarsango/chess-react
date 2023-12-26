import { FC } from 'react';
import './piece-styled.css';

interface FigureProps {
  imageUrl: string;
}

const Piece: FC<FigureProps> = ({ imageUrl }) => {
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');

  return (
    <img
      className="figure__diagram"
      alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess figure`}
      src={imageUrl}
    />
  );
};

export default Piece;
