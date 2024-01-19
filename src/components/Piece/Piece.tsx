import { FC, useContext } from 'react';
import './piece-styled.css';
import PiecesContext from '../../store/context/chessApp.context';
import { possiblePawnCaptures } from '../../static-data/logic/pieces';
import { ACTION_TYPES } from '../../static-data/types';

interface PieceProps {
  imageUrl: string;
  position: string;
}

const Piece: FC<PieceProps> = ({ imageUrl, position }) => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces, turn } = data;
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');

  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const allPossiblePawnCaptures =
    selectedPiece && possiblePawnCaptures(selectedPiece, allActivePieces);
  const handleClick = (selectedPosition: string) => {
    if (
      allPossiblePawnCaptures?.find(
        piecePosition => piecePosition === selectedPosition,
      )
    ) {
      dispatch({
        type: ACTION_TYPES.MOVED_PIECE,
        payload: selectedPosition,
      });
      return dispatch({
        type: ACTION_TYPES.CAPTURED_PIECE,
        payload: selectedPosition,
      });
    }

    //exits if the selected piece doesn't match the current turn
    if (
      allActivePieces.find(
        piece => piece.position === selectedPosition && piece.player !== turn,
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
      dispatch({
        type: ACTION_TYPES.UNSELECTED_PIECE,
        payload: selectedPosition,
      });
    }

    dispatch({ type: ACTION_TYPES.SELECTED_PIECE, payload: selectedPosition });
  };

  const highlightPossibleCaptureFrom = (
    possibleCaptures: string[],
    piecePosition: string,
  ) => {
    return possibleCaptures.find(position => piecePosition === position)
      ? 'piece--possible-capture'
      : '';
  };

  return (
    <button
      className={`piece-container ${
        allPossiblePawnCaptures &&
        highlightPossibleCaptureFrom(allPossiblePawnCaptures, position)
      }`}
      onClick={() => handleClick(position)}
    >
      <img
        className="piece__diagram"
        alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess piece`}
        src={imageUrl}
      />
    </button>
  );
};

export default Piece;
