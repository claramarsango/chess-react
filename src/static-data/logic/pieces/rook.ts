import { PieceModel } from '../../types';
import {
  filterColumnPiecesFrom,
  filterRowPiecesFrom,
  findClosestColumnPiecesFrom,
  findClosestRowPiecesFrom,
  possibleHorizontalMovesFrom,
  possibleVerticalMovesFrom,
} from './shared';

export const possibleRookMoves = (
  rook: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const filteredRowPieces = filterRowPiecesFrom(rook, piecesOnBoard);
  const filteredColumnPieces = filterColumnPiecesFrom(rook, piecesOnBoard);
  const allPossibleMoves = possibleHorizontalMovesFrom(
    rook,
    filteredRowPieces,
  ).concat(possibleVerticalMovesFrom(rook, filteredColumnPieces));

  return allPossibleMoves;
};

const findOpponentPiecesFrom = (
  capturablePieces: PieceModel[],
  currentPiece: PieceModel,
) => {
  const filteredOpponentPieces = capturablePieces.filter(
    opponentPiece => opponentPiece.player !== currentPiece.player,
  );

  return filteredOpponentPieces;
};

export const possibleRookCaptures = (
  rook: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const filteredRowPieces = filterRowPiecesFrom(rook, piecesOnBoard);
  const filteredColumnPieces = filterColumnPiecesFrom(rook, piecesOnBoard);
  const closestColumnPieces = findClosestColumnPiecesFrom(
    rook,
    filteredColumnPieces,
  );
  const closestRowPieces = findClosestRowPiecesFrom(rook, filteredRowPieces);
  const surroundingPieces = closestColumnPieces
    .concat(closestRowPieces)
    .filter(piece => piece) as PieceModel[];

  const possibleCaptures = findOpponentPiecesFrom(surroundingPieces, rook);

  return possibleCaptures;
};
