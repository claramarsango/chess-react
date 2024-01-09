import { buildEmptyBoard, buildInitialFormationFor } from './logic/board';
import { COLOURS } from './types';

export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = Array.from(
  { length: 8 },
  (_, index) => index + 1,
).reverse();

export const BOARD = buildEmptyBoard(ROWS, COLUMNS);

const WHITES = buildInitialFormationFor(COLOURS.WHITE);
const BLACKS = buildInitialFormationFor(COLOURS.BLACK);

export const ALL_INITIAL_PIECES = WHITES.concat(BLACKS);
