import { PieceModel } from '../../types';
import {
  findClosestColumnPiecesFrom,
  findClosestRowPiecesFrom,
  possibleHorizontalMovesFrom,
  possibleVerticalMovesFrom,
} from './shared';

export const possibleRookMoves = (
  rook: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const allPossibleMoves = possibleHorizontalMovesFrom(
    rook,
    piecesOnBoard,
  ).concat(possibleVerticalMovesFrom(rook, piecesOnBoard));

  return allPossibleMoves;
};

export const possibleRookCaptures = (
  rook: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const possibleCaptures = [];
  const closestPiecePositions = findClosestRowPiecesFrom(
    rook,
    piecesOnBoard,
  ).concat(findClosestColumnPiecesFrom(rook, piecesOnBoard));

  for (const position of closestPiecePositions) {
    const opponentPiece = piecesOnBoard.find(
      piece => piece.position === position && piece.player !== rook.player,
    );
    if (opponentPiece) possibleCaptures.push(opponentPiece);
  }

  return possibleCaptures;
};
