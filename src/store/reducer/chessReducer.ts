import {
  PieceAction,
  COLOURS,
  DataStructure,
  ACTION_TYPES,
} from '../../static-data/types';

const { SELECTED_PIECE, UNSELECTED_PIECE, MOVED_PIECE, CAPTURED_PIECE } =
  ACTION_TYPES;

const chessReducer = (
  previousState: DataStructure,
  action: PieceAction,
): DataStructure => {
  const { allActivePieces, turn, capturedPieces } = previousState;
  const updatedActivePieces = [...allActivePieces];
  const newTurn = turn === COLOURS.WHITE ? COLOURS.BLACK : COLOURS.WHITE;
  const updatedCapturedPieces = [...capturedPieces];
  const selectedPiece = allActivePieces.find(piece => piece.isSelected);

  switch (action.type) {
    case SELECTED_PIECE: {
      const pieceToSelect = allActivePieces.find(
        piece => piece.position === action.payload,
      );

      if (pieceToSelect) {
        const newSelectedPiece = {
          ...pieceToSelect,
          isSelected: true,
        };
        updatedActivePieces.splice(
          updatedActivePieces.indexOf(pieceToSelect),
          1,
          newSelectedPiece,
        );
      }

      return {
        ...previousState,
        allActivePieces: updatedActivePieces,
      };
    }

    case UNSELECTED_PIECE: {
      if (selectedPiece) {
        const unselectedPiece = {
          ...selectedPiece,
          isSelected: false,
        };

        updatedActivePieces.splice(
          updatedActivePieces.indexOf(selectedPiece),
          1,
          unselectedPiece,
        );
      }

      return {
        ...previousState,
        allActivePieces: updatedActivePieces,
      };
    }

    case MOVED_PIECE: {
      if (selectedPiece) {
        const movedPiece = {
          ...selectedPiece,
          position: action.payload,
          isSelected: false,
        };

        updatedActivePieces.splice(
          updatedActivePieces.indexOf(selectedPiece),
          1,
          movedPiece,
        );
      }

      const opponentPieceToCapture = allActivePieces.find(
        piece => piece.position === action.payload && piece.player !== turn,
      );

      return {
        ...previousState,
        allActivePieces: updatedActivePieces,
        turn: !opponentPieceToCapture ? newTurn : turn,
      };
    }

    case CAPTURED_PIECE: {
      const pieceToCapture = allActivePieces.find(
        piece => piece.position === action.payload && piece.player !== turn,
      );

      if (pieceToCapture) {
        updatedActivePieces.splice(
          updatedActivePieces.indexOf(pieceToCapture),
          1,
        );

        const capturedPiece = {
          ...pieceToCapture,
          position: '',
          isCaptured: true,
        };

        updatedCapturedPieces.push(capturedPiece);
      }

      return {
        ...previousState,
        allActivePieces: updatedActivePieces,
        turn: newTurn,
        capturedPieces: updatedCapturedPieces,
      };
    }

    default:
      return { ...previousState };
  }
};

export default chessReducer;
