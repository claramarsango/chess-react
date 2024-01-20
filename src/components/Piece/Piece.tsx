import { FC, useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import { possiblePawnCaptures } from '../../static-data/logic/pieces';
import { ACTION_TYPES } from '../../static-data/types';
import { PieceButton, PieceDiagram } from './piece.styled';

interface PieceProps {
  imageUrl: string;
  position: string;
}

const Piece: FC<PieceProps> = ({ imageUrl, position }) => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces, turn } = data;
  const splitImgTitle = imageUrl.split('/')[4].split('.')[0].split('-');

  const selectedPiece = allActivePieces.find(piece => piece.isSelected);
  const capturablePawn =
    selectedPiece &&
    possiblePawnCaptures(selectedPiece, allActivePieces).find(
      capturablePiece => capturablePiece.position === position,
    );

  const handleClick = (selectedPosition: string) => {
    if (capturablePawn) {
      dispatch({
        type: ACTION_TYPES.MOVED_PIECE,
        payload: capturablePawn.position,
      });
      return dispatch({
        type: ACTION_TYPES.CAPTURED_PIECE,
        payload: capturablePawn.position,
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

  return (
    <PieceButton onClick={() => handleClick(position)}>
      <PieceDiagram
        $possiblecapture={capturablePawn?.position ?? ''}
        alt={`${splitImgTitle[0]} ${splitImgTitle[1]} chess piece`}
        src={imageUrl}
      />
    </PieceButton>
  );
};

export default Piece;
