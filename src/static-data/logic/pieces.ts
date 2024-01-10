import { ALL_INITIAL_PIECES, COLUMNS } from '.././constants';
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

  return checkPossibleCapturesPlayer(
    pawn,
    piecesOnBoard,
    forwardLeftPosition,
    forwardRightPosition,
  );
};

const checkPossibleCapturesPlayer = (
  pawn: PieceModel,
  piecesOnBoard: PieceModel[],
  leftPosition: string,
  rightPosition: string,
) => {
  const allNewPossibleCaptures: string[] = [];

  const existingPieces = piecesOnBoard.filter(
    piece =>
      (piece.position === leftPosition || piece.position === rightPosition) &&
      piece.player !== pawn.player,
  );

  existingPieces.forEach(piece => allNewPossibleCaptures.push(piece.position));

  return allNewPossibleCaptures;
};
