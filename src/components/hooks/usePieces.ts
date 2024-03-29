import { useContext } from 'react';
import PiecesContext from '../../store/context/chessApp.context';
import { ACTION_TYPES, PieceModel } from '../../static-data/types';
import { possibleMovesFrom } from '../../static-data/logic/pieces/shared';

const usePieces = () => {
  const { data, dispatch } = useContext(PiecesContext);
  const { allActivePieces, turn } = data;

  const selectPieceAt = (selectedPosition: string) => {
    //exits if the selected piece doesn't match the current turn
    if (
      allActivePieces.find(
        piece => piece.position === selectedPosition && piece.player !== turn,
      )
    )
      return;
    //unselects piece
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

  const capturePieceAt = (selectedPosition: string) => {
    dispatch({
      type: ACTION_TYPES.MOVED_PIECE,
      payload: selectedPosition,
    });
    dispatch({
      type: ACTION_TYPES.CAPTURED_PIECE,
      payload: selectedPosition,
    });
  };

  const movePiece = (currentPiece: PieceModel, newPosition: string) => {
    // exits if the new selected position doesn't match with the piece's possible moves
    if (
      currentPiece &&
      !possibleMovesFrom(currentPiece, allActivePieces).find(
        possiblePosition => possiblePosition === newPosition,
      )
    )
      return;

    dispatch({
      type: ACTION_TYPES.MOVED_PIECE,
      payload: newPosition,
    });
  };

  return { data, selectPieceAt, capturePieceAt, movePiece };
};

export default usePieces;
