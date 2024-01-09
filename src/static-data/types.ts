export enum COLOURS {
  WHITE = 'white',
  BLACK = 'black',
}

export interface PieceModel {
  player: COLOURS;
  piece: string;
  diagram: string;
  position: string;
  isSelected: boolean;
}

export interface DataStructure {
  allActivePieces: PieceModel[];
  turn: COLOURS;
}

export type ActionType = {
  type: string;
  payload: string;
};
