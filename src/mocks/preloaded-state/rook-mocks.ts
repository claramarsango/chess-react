import { COLOURS, DataStructure, PieceModel } from '../../static-data/types';
import { defaultBlackPawn } from './pawn-mocks';

const defaultWhiteRook: PieceModel = {
  piece: 'rook',
  diagram: '/assets/chess-pieces/white/white-rook.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.WHITE,
  position: 'A1',
};

export const rookInVerticalDirectBlackCapturePosition: DataStructure = {
  allActivePieces: [defaultWhiteRook, { ...defaultBlackPawn, position: 'A7' }],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

export const rookInHorizontalBlackCapturePosition: DataStructure = {
  allActivePieces: [defaultWhiteRook, { ...defaultBlackPawn, position: 'C1' }],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

export const rookWithTwoPawnsInFront: DataStructure = {
  allActivePieces: [
    defaultWhiteRook,
    { ...defaultBlackPawn, position: 'A5' },
    { ...defaultBlackPawn, position: 'A7' },
  ],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

export const rookWithTwoPawnsToTheRight: DataStructure = {
  allActivePieces: [
    defaultWhiteRook,
    { ...defaultBlackPawn, position: 'C1' },
    { ...defaultBlackPawn, position: 'F1' },
  ],
  turn: COLOURS.WHITE,
  capturedPieces: [],
};
