import { BOARD, COLUMNS, ROWS } from '../../constants';
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

export const filterColumnPiecesFrom = (
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

const findClosestPieceAbove = (
  currentPiece: PieceModel,
  columnPieces: PieceModel[],
) => {
  const currentPieceRow = currentPiece.position[1];
  const firstPieceAbove = columnPieces.find(
    columnPiece => columnPiece.position[1] > currentPieceRow,
  );

  return firstPieceAbove;
};

const findClosestPieceBelow = (
  currentPiece: PieceModel,
  columnPieces: PieceModel[],
) => {
  const currentPieceRow = currentPiece.position[1];
  const firstPieceBelow = columnPieces.findLast(
    columnPiece => currentPieceRow > columnPiece.position[1],
  );

  return firstPieceBelow;
};

export const findClosestColumnPiecesFrom = (
  currentPiece: PieceModel,
  columnPieces: PieceModel[],
) => {
  const closestColumnPieces: (PieceModel | undefined)[] = [];
  const directPieceAbove = findClosestPieceAbove(currentPiece, columnPieces);
  const directPieceBelow = findClosestPieceBelow(currentPiece, columnPieces);

  closestColumnPieces.push(directPieceAbove, directPieceBelow);

  return closestColumnPieces;
};

const filterColumnPositionsFor = (currentPiecePosition: string) => {
  const currentPieceColumn = currentPiecePosition[0];
  return BOARD.filter(
    position =>
      position.startsWith(currentPieceColumn) &&
      currentPiecePosition !== position,
  );
};

const findFreeTopPositionsFrom = (
  topPiece: PieceModel | undefined,
  columnPositions: string[],
) => {
  const topPieceRow = topPiece?.position[1] ?? ROWS.length + 1;
  return columnPositions.filter(position => position[1] < topPieceRow);
};

const findFreeBottomPositionsFrom = (
  bottomPiece: PieceModel | undefined,
  columnPositions: string[],
) => {
  const bottomPieceRow = bottomPiece?.position[1] ?? 0;
  return columnPositions.filter(position => bottomPieceRow < position[1]);
};

export const possibleVerticalMovesFrom = (
  piece: PieceModel,
  columnPieces: PieceModel[],
) => {
  const [topPiece, bottomPiece] = findClosestColumnPiecesFrom(
    piece,
    columnPieces,
  );
  const filteredColumnPositions = filterColumnPositionsFor(piece.position);
  const freeTopPositions = findFreeTopPositionsFrom(
    topPiece,
    filteredColumnPositions,
  );
  const freeBottomPositions = findFreeBottomPositionsFrom(
    bottomPiece,
    filteredColumnPositions,
  );
  const possibleNewVerticalPositions = freeTopPositions.filter(position =>
    freeBottomPositions.includes(position),
  );

  return possibleNewVerticalPositions;
};

const findClosestPieceLeft = (
  currentPiece: PieceModel,
  rowPieces: PieceModel[],
) => {
  const currentPieceColumn = currentPiece.position[0];
  const firstPieceLeft = rowPieces.findLast(
    rowPiece => currentPieceColumn > rowPiece.position[0],
  );

  return firstPieceLeft;
};

const findClosestPieceRight = (
  currentPiece: PieceModel,
  rowPieces: PieceModel[],
) => {
  const currentPieceColumn = currentPiece.position[0];
  const firstPieceRight = rowPieces.find(
    rowPiece => rowPiece.position[0] > currentPieceColumn,
  );

  return firstPieceRight;
};

export const findClosestRowPiecesFrom = (
  currentPiece: PieceModel,
  rowPieces: PieceModel[],
) => {
  const closestRowPieces: (PieceModel | undefined)[] = [];
  const directPieceLeft = findClosestPieceLeft(currentPiece, rowPieces);
  const directPieceRight = findClosestPieceRight(currentPiece, rowPieces);

  closestRowPieces.push(directPieceLeft, directPieceRight);

  return closestRowPieces;
};

const filterRowPositionsFor = (currentPiecePosition: string) => {
  const currentPieceRow = currentPiecePosition[1];
  return BOARD.filter(
    position =>
      position.endsWith(currentPieceRow) && currentPiecePosition !== position,
  );
};

const findFreeLeftPositionsFrom = (
  leftPiece: PieceModel | undefined,
  rowPositions: string[],
) => {
  const leftPieceColumn = COLUMNS.indexOf(leftPiece?.position[0] ?? '');
  return rowPositions.filter(
    position => leftPieceColumn < COLUMNS.indexOf(position[0]),
  );
};

const findFreeRightPositionsFrom = (
  rightPiece: PieceModel | undefined,
  rowPositions: string[],
) => {
  const rightPieceColumn = rightPiece
    ? COLUMNS.indexOf(rightPiece.position[0])
    : COLUMNS.length + 1;
  return rowPositions.filter(
    position => COLUMNS.indexOf(position[0]) < rightPieceColumn,
  );
};

export const possibleHorizontalMovesFrom = (
  piece: PieceModel,
  rowPieces: PieceModel[],
) => {
  const [leftPiece, rightPiece] = findClosestRowPiecesFrom(piece, rowPieces);
  const filteredRowPositions = filterRowPositionsFor(piece.position);
  const freeLeftPositions = findFreeLeftPositionsFrom(
    leftPiece,
    filteredRowPositions,
  );
  const freeRightPositions = findFreeRightPositionsFrom(
    rightPiece,
    filteredRowPositions,
  );
  const possibleNewHorizontalPositions = freeLeftPositions.filter(position =>
    freeRightPositions.includes(position),
  );

  return possibleNewHorizontalPositions;
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
