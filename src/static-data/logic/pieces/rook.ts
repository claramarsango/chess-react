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

const findOpponentPiecesFrom = (
  capturablePositions: string[],
  piecesOnBoard: PieceModel[],
  currentPiece: PieceModel,
) => {
  const filteredOpponentPieces: PieceModel[] = [];

  for (const position of capturablePositions) {
    const opponentPiece = piecesOnBoard.find(
      piece =>
        piece.position === position && piece.player !== currentPiece.player,
    );
    if (opponentPiece) filteredOpponentPieces.push(opponentPiece);
  }

  return filteredOpponentPieces;
};

export const possibleRookCaptures = (
  rook: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const closestPiecePositions = findClosestRowPiecesFrom(
    rook,
    piecesOnBoard,
  ).concat(findClosestColumnPiecesFrom(rook, piecesOnBoard));

  const possibleCaptures = findOpponentPiecesFrom(
    closestPiecePositions,
    piecesOnBoard,
    rook,
  );

  return possibleCaptures;
};
