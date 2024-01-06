import { COLOURS, DataStructure } from '../../static-data/types';

export type ActionType = {
  type: string;
  payload: string;
};

const chessReducer = (
  previousState: DataStructure,
  action: ActionType,
): DataStructure => {
  const { allActivePieces, turn } = previousState;
  const updatedPieces = [...allActivePieces];

  switch (action.type) {
    case 'selectPiece': {
      for (const piece of allActivePieces) {
        if (piece.position === action.payload) {
          const selectedPiece = {
            ...piece,
            isSelected: true,
          };

          updatedPieces.splice(updatedPieces.indexOf(piece), 1, selectedPiece);
        }
      }
      return {
        ...previousState,
        allActivePieces: updatedPieces,
      };
    }

    case 'unselectPiece': {
      for (const piece of allActivePieces) {
        if (piece.isSelected) {
          const unselectedPiece = {
            ...piece,
            isSelected: false,
          };

          updatedPieces.splice(
            updatedPieces.indexOf(piece),
            1,
            unselectedPiece,
          );
        }
      }
      return {
        ...previousState,
        allActivePieces: updatedPieces,
      };
    }

    case 'movePiece': {
      for (const piece of allActivePieces) {
        if (piece.isSelected) {
          const movedPiece = {
            ...piece,
            position: action.payload,
            isSelected: false,
          };

          updatedPieces.splice(updatedPieces.indexOf(piece), 1, movedPiece);
        }
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
