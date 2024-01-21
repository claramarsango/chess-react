import { useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import { ACTION_TYPES, PieceModel } from '../../static-data/types';
import { possiblePawnMoves } from '../../static-data/logic/pieces';

const usePieces = () => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces } = data;

  const movePiece = (currentPiece: PieceModel, newPosition: string) => {
    // exits if the new selected position doesn't match with the pawn's possible moves
    if (
      currentPiece &&
      !possiblePawnMoves(currentPiece, allActivePieces).find(
        possiblePosition => possiblePosition === newPosition,
      )
    )
      return;

    dispatch({
      type: ACTION_TYPES.MOVED_PIECE,
      payload: newPosition,
    });
  };

  return { data, movePiece };
};

export default usePieces;
