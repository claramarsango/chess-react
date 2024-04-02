import { BOARD } from '../constants';
import { COLOURS, PIECE_NAMES, PieceModel } from '../types';

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
  piece: PIECE_NAMES,
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
    buildPiece(colour, PIECE_NAMES.PAWN, position),
  );

  return frontRowPieces;
};

const defineBackRowFrom = (colour: COLOURS) => {
  const currentBackRow = colour === COLOURS.WHITE ? '1' : '8';
  return currentBackRow;
};

const filterBackRowPositionsFrom = (currentBackRow: string) => {
  return BOARD.filter((square: string) => square[1] === currentBackRow);
};

const buildBackRowLateralPiecesFrom = (
  colour: COLOURS,
  backRowPositions: string[],
  lateralPiecesNames: PIECE_NAMES[],
) => {
  const builtLeftLateralPieces = lateralPiecesNames.map((piece, index) =>
    buildPiece(colour, piece, backRowPositions[index]),
  );
  const builtRightLateralPieces = lateralPiecesNames.map((piece, index) =>
    buildPiece(
      colour,
      piece,
      backRowPositions[backRowPositions.length - (index + 1)],
    ),
  );
  const builtLateralPieces = builtLeftLateralPieces.concat(
    builtRightLateralPieces,
  );

  return builtLateralPieces;
};

const buildBackRowFormationFor = (colour: COLOURS) => {
  const backRow = defineBackRowFrom(colour);
  const backRowPositions = filterBackRowPositionsFrom(backRow);
  const backRowPieces: PieceModel[] = [];
  const lateralPiecesNames = [
    PIECE_NAMES.ROOK,
    PIECE_NAMES.KNIGHT,
    PIECE_NAMES.BISHOP,
  ];
  const lateralPieces = buildBackRowLateralPiecesFrom(
    colour,
    backRowPositions,
    lateralPiecesNames,
  );
  const queen = buildPiece(colour, PIECE_NAMES.QUEEN, backRowPositions[3]);
  const king = buildPiece(colour, PIECE_NAMES.KING, backRowPositions[4]);

  lateralPieces.forEach(piece => backRowPieces.push(piece));
  backRowPieces.push(queen);
  backRowPieces.push(king);

  return backRowPieces;
};

export const buildInitialFormationFor = (colour: COLOURS) => {
  const builtFrontRow = buildFrontRowFormationFor(colour);
  const builtBackRow = buildBackRowFormationFor(colour);
  const allPieces = builtFrontRow.concat(builtBackRow);

  return allPieces;
};
