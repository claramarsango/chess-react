import { FC } from 'react';
import './figure-styled.css';

interface FigureProps {
  imageUrl: string;
}

const Figure: FC<FigureProps> = ({ imageUrl }) => {
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');

  return (
    <img
      className="figure__diagram"
      alt={`${splitImgTitle[1]} ${splitImgTitle[0]} chess figure`}
      src={imageUrl}
    />
  );
};

export default Figure;
