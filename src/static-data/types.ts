export enum COLOURS {
  WHITE = 'white',
  BLACK = 'black',
}

export enum PIECE_NAMES {
  PAWN = 'pawn',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
}

export interface PieceModel {
  player: COLOURS;
  piece: string;
  diagram: string;
  position: string;
  isSelected: boolean;
  isCaptured: boolean;
}

export interface DataStructure {
  allActivePieces: PieceModel[];
  turn: COLOURS;
  capturedPieces: PieceModel[];
}

export enum ACTION_TYPES {
  SELECTED_PIECE = 'selectedPiece',
  UNSELECTED_PIECE = 'unselectedPiece',
  MOVED_PIECE = 'movedPiece',
  CAPTURED_PIECE = 'capturedPiece',
}

export type PieceAction = {
  type: string;
  payload: string;
};
