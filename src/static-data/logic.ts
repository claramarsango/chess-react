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

  const firstRowPositions = BOARD.filter(square => square[1] === firstRow);
  const secondRowPositions = BOARD.filter(square => square[1] === secondRow);

  for (let i = 0; i <= 4; i++) {
    const position = firstRowPositions[i];
    const oppositeEnd = [
      firstRowPositions[firstRowPositions.length - (i + 1)][0],
      position[1],
    ];

    if (!i) {
      completeFormation.push(buildPiece(colour, 'rook', position));
      completeFormation.push(buildPiece(colour, 'rook', oppositeEnd));
    } else if (i === 1) {
      completeFormation.push(buildPiece(colour, 'knight', position));
      completeFormation.push(buildPiece(colour, 'knight', oppositeEnd));
    } else if (i === 2) {
      completeFormation.push(buildPiece(colour, 'bishop', position));
      completeFormation.push(buildPiece(colour, 'bishop', oppositeEnd));
    } else if (i === 3) {
      completeFormation.push(buildPiece(colour, 'queen', position));
    } else {
      completeFormation.push(buildPiece(colour, 'king', position));
    }
  }

  for (const position of secondRowPositions) {
    completeFormation.push(buildPiece(colour, 'pawn', position));
  }

  return completeFormation;
};
