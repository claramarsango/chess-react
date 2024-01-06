import { ALL_INITIAL_PIECES } from '.././constants';
import { COLOURS, PieceModel } from '.././types';

export const possiblePawnMoves = (pawn: PieceModel) => {
  const allNewPossiblePositions: string[] = [];
  let newPossiblePosition: string;

  if (
    ALL_INITIAL_PIECES.find(
      (initialPiece: PieceModel) => pawn.position === initialPiece.position,
    )
  ) {
    const twoForward =
      pawn.player === COLOURS.WHITE
        ? Number(pawn.position[1]) + 2
        : Number(pawn.position[1]) - 2;

    newPossiblePosition = `${pawn.position[0]}${twoForward}`;

    allNewPossiblePositions.push(newPossiblePosition);
  }

  const oneForward =
    pawn.player === COLOURS.WHITE
      ? Number(pawn.position[1]) + 1
      : Number(pawn.position[1]) - 1;

  newPossiblePosition = `${pawn.position[0]}${oneForward}`;

  allNewPossiblePositions.push(newPossiblePosition);

  return allNewPossiblePositions;
};
