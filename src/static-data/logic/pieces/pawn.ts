import { ALL_INITIAL_PIECES, COLUMNS } from '../../constants';
import { COLOURS, PieceModel } from '../../types';

export const possiblePawnMoves = (
  pawn: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const allNewPossiblePositions: string[] = [];
  let newPossiblePosition: string;

  const oneForward =
    pawn.player === COLOURS.WHITE
      ? Number(pawn.position[1]) + 1
      : Number(pawn.position[1]) - 1;

  newPossiblePosition = `${pawn.position[0]}${oneForward}`;

  allNewPossiblePositions.push(newPossiblePosition);

  if (
    ALL_INITIAL_PIECES.find(
      (initialPiece: PieceModel) => pawn.position === initialPiece.position,
    ) &&
    piecesOnBoard.every(piece => piece.position !== newPossiblePosition)
  ) {
    const twoForward =
      pawn.player === COLOURS.WHITE
        ? Number(pawn.position[1]) + 2
        : Number(pawn.position[1]) - 2;

    newPossiblePosition = `${pawn.position[0]}${twoForward}`;

    allNewPossiblePositions.push(newPossiblePosition);
  }

  return allNewPossiblePositions;
};

export const possiblePawnCaptures = (
  pawn: PieceModel,
  piecesOnBoard: PieceModel[],
) => {
  const currentPawnColumn = COLUMNS.indexOf(pawn.position[0]);
  const currentPawnRow = Number(pawn.position[1]);
  const oneRowForward =
    pawn.player === COLOURS.WHITE ? currentPawnRow + 1 : currentPawnRow - 1;

  const forwardLeftPosition = `${COLUMNS.at(
    currentPawnColumn - 1,
  )}${oneRowForward}`;
  const forwardRightPosition = `${COLUMNS.at(
    currentPawnColumn + 1,
  )}${oneRowForward}`;

  const filteredPossibleCaptures = piecesOnBoard.filter(
    piece =>
      (piece.position === forwardLeftPosition ||
        piece.position === forwardRightPosition) &&
      piece.player !== pawn.player,
  );

  return filteredPossibleCaptures;
};
