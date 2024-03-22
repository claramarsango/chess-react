import { COLOURS, DataStructure, PieceModel } from '../../static-data/types';

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
