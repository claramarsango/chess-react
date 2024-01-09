import { ActionType, COLOURS, DataStructure } from '../../static-data/types';

const chessReducer = (
  previousState: DataStructure,
  action: ActionType,
): DataStructure => {
  const { allActivePieces, turn } = previousState;
  const updatedPieces = [...allActivePieces];
  const pieceToSelect = allActivePieces.find(
    piece => piece.position === action.payload,
  );
  const selectedPiece = allActivePieces.find(piece => piece.isSelected);

  switch (action.type) {
    case 'selectPiece': {
      if (pieceToSelect) {
        const selectedPiece = {
          ...pieceToSelect,
          isSelected: true,
        };
        updatedPieces.splice(
          updatedPieces.indexOf(pieceToSelect),
          1,
          selectedPiece,
        );
      }

      return {
        ...previousState,
        allActivePieces: updatedPieces,
      };
    }

    case 'unselectPiece': {
      if (selectedPiece) {
        const unselectedPiece = {
          ...selectedPiece,
          isSelected: false,
        };

        updatedPieces.splice(
          updatedPieces.indexOf(selectedPiece),
          1,
          unselectedPiece,
        );
      }

      return {
        ...previousState,
        allActivePieces: updatedPieces,
      };
    }

    case 'movePiece': {
      if (selectedPiece) {
        const movedPiece = {
          ...selectedPiece,
          position: action.payload,
          isSelected: false,
        };

        updatedPieces.splice(
          updatedPieces.indexOf(selectedPiece),
          1,
          movedPiece,
        );
      }

      return {
        ...previousState,
        allActivePieces: updatedPieces,
        turn: turn === COLOURS.WHITE ? COLOURS.BLACK : COLOURS.WHITE,
      };
    }

    default:
      return { ...previousState };
  }
};

export default chessReducer;
