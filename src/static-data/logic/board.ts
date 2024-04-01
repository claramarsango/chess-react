import { BOARD } from '../constants';
import { COLOURS, PieceModel } from '../types';

export const buildEmptyBoard = (rows: number[], columns: string[]) => {
  const completeBoard: string[] = [];

  for (const rowId of rows) {
    for (const columnId of columns) {
      completeBoard.push(`${columnId}${rowId}`);
    }
  }

  return completeBoard;
};

export const buildPiece = (
  colour: COLOURS,
  piece: string,
  position: string,
) => {
  const completePiece: PieceModel = {
    player: colour,
    piece,
    diagram: `/assets/chess-pieces/${colour}/${colour}-${piece}.png`,
    position,
    isSelected: false,
    isCaptured: false,
  };
  return completePiece;
};

const defineFrontRowFrom = (colour: COLOURS) => {
  const currentFrontRow = colour === COLOURS.WHITE ? '2' : '7';
  return currentFrontRow;
};

const filterFrontRowPositionsFrom = (currentFrontRow: string) => {
  return BOARD.filter((square: string) => square[1] === currentFrontRow);
};

const buildFrontRowFormationFor = (colour: COLOURS) => {
  const frontRow = defineFrontRowFrom(colour);
  const frontRowPositions = filterFrontRowPositionsFrom(frontRow);
  const frontRowPieces = frontRowPositions.map(position =>
    buildPiece(colour, 'pawn', position),
  );

  return frontRowPieces;
};

export const buildInitialFormationFor = (colour: COLOURS) => {
  const allPieces: PieceModel[] = [];

  const builtFrontRow = buildFrontRowFormationFor(colour);
  builtFrontRow.forEach(piece => allPieces.push(piece));

  const backRow = colour === COLOURS.WHITE ? '1' : '8';

  const backRowPositions: string[] = BOARD.filter(
    (square: string) => square[1] === backRow,
  );

  for (let i = 0; i <= 4; i++) {
    const position = backRowPositions[i];
    const reversedBackRowPositions = Array.from(backRowPositions).reverse();
    const oppositeEnd = reversedBackRowPositions[i];

    if (!i) {
      allPieces.push(buildPiece(colour, 'rook', position));
      allPieces.push(buildPiece(colour, 'rook', oppositeEnd));
    } else if (i === 1) {
      allPieces.push(buildPiece(colour, 'knight', position));
      allPieces.push(buildPiece(colour, 'knight', oppositeEnd));
    } else if (i === 2) {
      allPieces.push(buildPiece(colour, 'bishop', position));
      allPieces.push(buildPiece(colour, 'bishop', oppositeEnd));
    } else if (i === 3) {
      allPieces.push(buildPiece(colour, 'queen', position));
    } else {
      allPieces.push(buildPiece(colour, 'king', position));
    }
  }

  return allPieces;
};
