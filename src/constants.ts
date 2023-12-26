import { FigureModel } from './models';

export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const ROWS = Array.from(
  { length: 8 },
  (_, index) => index + 1,
).reverse();

export const LIGHT_TEAM: FigureModel[] = [
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['A', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['B', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['C', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['D', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['E', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['F', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['G', 2],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/light/pawn-light.png',
    position: ['H', 2],
  },
  {
    figure: 'rook',
    diagram: '/assets/chess-pieces/light/rook-light.png',
    position: ['A', 1],
  },
  {
    figure: 'rook',
    diagram: '/assets/chess-pieces/light/rook-light.png',
    position: ['H', 1],
  },
  {
    figure: 'knight',
    diagram: '/assets/chess-pieces/light/knight-light.png',
    position: ['B', 1],
  },
  {
    figure: 'knight',
    diagram: '/assets/chess-pieces/light/knight-light.png',
    position: ['G', 1],
  },
  {
    figure: 'bishop',
    diagram: '/assets/chess-pieces/light/bishop-light.png',
    position: ['C', 1],
  },
  {
    figure: 'bishop',
    diagram: '/assets/chess-pieces/light/bishop-light.png',
    position: ['F', 1],
  },
  {
    figure: 'queen',
    diagram: '/assets/chess-pieces/light/queen-light.png',
    position: ['D', 1],
  },
  {
    figure: 'king',
    diagram: '/assets/chess-pieces/light/king-light.png',
    position: ['E', 1],
  },
];

export const DARK_TEAM: FigureModel[] = [
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['A', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['B', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['C', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['D', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['E', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['F', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['G', 7],
  },
  {
    figure: 'pawn',
    diagram: '/assets/chess-pieces/dark/pawn-dark.png',
    position: ['H', 7],
  },
  {
    figure: 'rook',
    diagram: '/assets/chess-pieces/dark/rook-dark.png',
    position: ['A', 8],
  },
  {
    figure: 'rook',
    diagram: '/assets/chess-pieces/dark/rook-dark.png',
    position: ['H', 8],
  },
  {
    figure: 'knight',
    diagram: '/assets/chess-pieces/dark/knight-dark.png',
    position: ['B', 8],
  },
  {
    figure: 'knight',
    diagram: '/assets/chess-pieces/dark/knight-dark.png',
    position: ['G', 8],
  },
  {
    figure: 'bishop',
    diagram: '/assets/chess-pieces/dark/bishop-dark.png',
    position: ['C', 8],
  },
  {
    figure: 'bishop',
    diagram: '/assets/chess-pieces/dark/bishop-dark.png',
    position: ['F', 8],
  },
  {
    figure: 'queen',
    diagram: '/assets/chess-pieces/dark/queen-dark.png',
    position: ['D', 8],
  },
  {
    figure: 'king',
    diagram: '/assets/chess-pieces/dark/king-dark.png',
    position: ['E', 8],
  },
];
