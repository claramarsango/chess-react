import { FC, useContext } from 'react';
import './piece-styled.css';
import PiecesContext from '../../store/context/chessApp.context';

interface PieceProps {
  imageUrl: string;
  position: string;
}

const Piece: FC<PieceProps> = ({ imageUrl, position }) => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces } = data;
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');

  const handleClick = (selectedPosition: string) => {
    //exits if the selected piece doesn't match the current turn
    if (
      allActivePieces.find(
        piece =>
          piece.position === selectedPosition && piece.player !== data.turn,
      )
    )
      return;
    //exits if the selected piece is not a pawn
    if (
      allActivePieces.find(
        piece => piece.position === selectedPosition && piece.piece !== 'pawn',
      )
    )
      return;

    if (
      allActivePieces.find(
        piece => piece.isSelected && piece.position !== selectedPosition,
      )
    ) {
      dispatch({ type: 'unselectPiece', payload: selectedPosition });
    }

    dispatch({ type: 'selectPiece', payload: selectedPosition });
  };

  return (
    <button className="piece-container" onClick={() => handleClick(position)}>
      <img
        className="piece__diagram"
        alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess piece`}
        src={imageUrl}
      />
    </button>
  );
};

export default Piece;
