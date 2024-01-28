import { COLOURS, DataStructure, PieceModel } from '../static-data/types';

const defaultWhitePawn: PieceModel = {
  piece: 'pawn',
  diagram: '/assets/chess-pieces/white/white-pawn.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.WHITE,
  position: 'E2',
};

const defaultBlackPawn: PieceModel = {
  piece: 'pawn',
  diagram: '/assets/chess-pieces/black/black-pawn.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.BLACK,
  position: 'D7',
};

export const blackTurnPawn: DataStructure = {
  allActivePieces: [defaultBlackPawn],
  turn: COLOURS.BLACK,
  capturedPieces: [],
};

export const pawnsInBlackCapturePosition: DataStructure = {
  allActivePieces: [
    {
      ...defaultWhitePawn,
      position: 'E4',
    },
    {
      ...defaultBlackPawn,
      position: 'D5',
    },
  ],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

const defaultWhiteRook: PieceModel = {
  piece: 'rook',
  diagram: '/assets/chess-pieces/white/white-rook.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.WHITE,
  position: 'A1',
};

export const rookInVerticalBlackCapturePosition: DataStructure = {
  allActivePieces: [defaultWhiteRook, { ...defaultBlackPawn, position: 'A7' }],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

export const rookInHorizontalBlackCapturePosition: DataStructure = {
  allActivePieces: [defaultWhiteRook, { ...defaultBlackPawn, position: 'C1' }],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

const defaultWhiteKing: PieceModel = {
  piece: 'king',
  diagram: '/assets/chess-pieces/white/white-king.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.WHITE,
  position: 'E1',
};

export const kingInDefaultPosition: DataStructure = {
  allActivePieces: [defaultWhiteKing],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};
