import { BOARD, COLUMNS } from '../../constants';
import { PieceModel } from '../../types';
import { possiblePawnCaptures, possiblePawnMoves } from './pawn';
import { possibleRookCaptures, possibleRookMoves } from './rook';

const filterUnselectedPiecesOnBoard = (piecesOnBoard: PieceModel[]) => {
  return piecesOnBoard.filter(piece => !piece.isSelected);
};

const sortColumnPieces = (columnPieces: PieceModel[]) => {
  const sortedColumnPieces = Array.from(columnPieces).sort(
    (a, b) => Number(a.position[1]) - Number(b.position[1]),
  );
  return sortedColumnPieces;
};

const filterColumnPiecesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const currentPieceColumn = piece.position[0];
  const filteredColumnPieces = piecesOnBoard.filter(columnPiece =>
    columnPiece.position.startsWith(currentPieceColumn),
  );
  const columnPiecesInOrder = sortColumnPieces(filteredColumnPieces);
  return columnPiecesInOrder;
};

const sortRowPieces = (rowPieces: PieceModel[]) => {
  const sortedRowPieces = Array.from(rowPieces).sort(
    (a, b) => COLUMNS.indexOf(a.position[0]) - COLUMNS.indexOf(b.position[0]),
  );
  return sortedRowPieces;
};

export const filterRowPiecesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const currentPieceRow = piece.position[1];
  const rowPieces = piecesOnBoard.filter(rowPiece =>
    rowPiece.position.endsWith(currentPieceRow),
  );
  const rowPiecesInOrder = sortRowPieces(rowPieces);

  return rowPiecesInOrder;
};

export const findClosestColumnPiecesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const closestColumnPiecePositions: string[] = [];
  const currentPieceColumn = piece.position[0];
  const currentPieceRow = piece.position[1];
  const currentColumnPieces = filterColumnPiecesFrom(piece, piecesOnBoard);

  const firstPiecePositionUp =
    currentColumnPieces.find(
      columnPiece => columnPiece.position[1] > currentPieceRow,
    )?.position ?? `${currentPieceColumn}9`;

  const firstPiecePositionDown =
    currentColumnPieces.findLast(
      columnPiece => currentPieceRow > columnPiece.position[1],
    )?.position ?? `${currentPieceColumn}0`;

  closestColumnPiecePositions.push(
    firstPiecePositionUp,
    firstPiecePositionDown,
  );

  return closestColumnPiecePositions;
};

export const possibleVerticalMovesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const [topLimit, bottomLimit] = findClosestColumnPiecesFrom(
    piece,
    piecesOnBoard,
  );
  const currentPieceColumn = piece.position[0];

  const currentColumnPositions = BOARD.filter(
    position =>
      position.startsWith(currentPieceColumn) && position !== piece.position,
  );

  const freeVerticalPositions = currentColumnPositions.filter(
    position => topLimit > position && position > bottomLimit,
  );

  return freeVerticalPositions;
};

export const findClosestRowPiecesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const closestRowPiecePositions: string[] = [];
  const currentPieceColumn = piece.position[0];
  const currentPieceRow = piece.position[1];
  const currentRowPieces = filterRowPiecesFrom(piece, piecesOnBoard);

  const firstPiecePositionLeft =
    currentRowPieces.findLast(
      rowPiece => currentPieceColumn > rowPiece.position[0],
    )?.position ?? `0${currentPieceRow}`;

  const firstPiecePositionRight =
    currentRowPieces.find(rowPiece => rowPiece.position[0] > currentPieceColumn)
      ?.position ?? `I${currentPieceRow}`;

  closestRowPiecePositions.push(
    firstPiecePositionLeft,
    firstPiecePositionRight,
  );

  return closestRowPiecePositions;
};

export const possibleHorizontalMovesFrom = (
  piece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const [leftLimit, rightLimit] = findClosestRowPiecesFrom(
    piece,
    piecesOnBoard,
  );
  const currentPieceRow = piece.position[1];

  const currentRowPositions = BOARD.filter(
    position =>
      position.endsWith(currentPieceRow) && position !== piece.position,
  );

  const freeHorizontalPositions = currentRowPositions.filter(
    position => leftLimit < position && position < rightLimit,
  );

  return freeHorizontalPositions;
};

export const possibleMovesFrom = (
  selectedPiece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  switch (selectedPiece.piece) {
    case 'pawn':
      return possiblePawnMoves(selectedPiece, piecesOnBoard);
    case 'rook':
      return possibleRookMoves(selectedPiece, piecesOnBoard);
    default:
      return [];
  }
};

export const possibleCapturesFrom = (
  selectedPiece: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const unselectedPiecesOnBoard = filterUnselectedPiecesOnBoard(piecesOnBoard);

  switch (selectedPiece.piece) {
    case 'pawn':
      return possiblePawnCaptures(selectedPiece, unselectedPiecesOnBoard);
    case 'rook':
      return possibleRookCaptures(selectedPiece, unselectedPiecesOnBoard);
    default:
      return [];
  }
};
