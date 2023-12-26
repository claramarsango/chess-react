export enum COLOURS {
  WHITE = 'white',
  BLACK = 'black',
}

export interface PieceModel {
  piece: string;
  diagram: string;
  position: (string | number)[];
}
