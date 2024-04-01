import { COLOURS, DataStructure, PieceModel } from '../../static-data/types';

const defaultWhitePawn: PieceModel = {
  piece: 'pawn',
  diagram: '/assets/chess-pieces/white/white-pawn.png',
  isCaptured: false,
  isSelected: true,
  player: COLOURS.WHITE,
  position: 'E2',
};

export const defaultBlackPawn: PieceModel = {
  piece: 'pawn',
  diagram: '/assets/chess-pieces/black/black-pawn.png',
  isCaptured: false,
  isSelected: false,
  player: COLOURS.BLACK,
  position: 'D7',
};

export const blackTurnPawn: DataStructure = {
  allActivePieces: [{ ...defaultBlackPawn, isSelected: true }],
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
