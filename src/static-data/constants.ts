import { buildBoard, buildInitialFormationFor } from './logic';
import { COLOURS } from './types';

export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = Array.from(
  { length: 8 },
  (_, index) => index + 1,
).reverse();

export const BOARD = buildBoard(ROWS, COLUMNS);

export const WHITES = buildInitialFormationFor(COLOURS.WHITE);
export const BLACKS = buildInitialFormationFor(COLOURS.BLACK);
