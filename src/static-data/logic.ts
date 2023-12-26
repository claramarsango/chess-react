import { BOARD } from './constants';
import { COLOURS, PieceModel } from './types';

export const buildBoard = (rows: number[], columns: string[]) => {
  const completeBoard: (string | number)[][] = [];

  for (const rowId of rows) {
    for (const columnId of columns) {
      completeBoard.push([columnId, rowId]);
    }
  }

  return completeBoard;
};

export const buildPiece = (
  colour: COLOURS,
  piece: string,
  position: (string | number)[],
) => {
  const completePiece: PieceModel = {
    piece,
    diagram: `/assets/chess-pieces/${colour}/${colour}-${piece}.png`,
    position,
  };
  return completePiece;
};

export const buildInitialFormationFor = (colour: COLOURS) => {
  const completeFormation: PieceModel[] = [];

  const firstRow = colour === COLOURS.WHITE ? 1 : 8;
  const secondRow = colour === COLOURS.WHITE ? 2 : 7;

  for (const square of BOARD) {
    const squareString = square.toString();
    const squareRow = square[1];

    if (squareRow === secondRow) {
      completeFormation.push(buildPiece(colour, 'pawn', square));
    } else if (
      squareString === ['A', firstRow].toString() ||
      squareString === ['H', firstRow].toString()
    ) {
      completeFormation.push(buildPiece(colour, 'rook', square));
    } else if (
      squareString === ['B', firstRow].toString() ||
      squareString === ['G', firstRow].toString()
    ) {
      completeFormation.push(buildPiece(colour, 'knight', square));
    } else if (
      squareString === ['C', firstRow].toString() ||
      squareString === ['F', firstRow].toString()
    ) {
      completeFormation.push(buildPiece(colour, 'bishop', square));
    } else if (squareString === ['D', firstRow].toString()) {
      completeFormation.push(buildPiece(colour, 'queen', square));
    } else if (squareString === ['E', firstRow].toString()) {
      completeFormation.push(buildPiece(colour, 'king', square));
    }
  }

  return completeFormation;
};
