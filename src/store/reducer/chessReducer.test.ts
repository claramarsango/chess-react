import { PieceAction, COLOURS, DataStructure } from '../../static-data/types';
import chessReducer from './chessReducer';

test("Given a reducer to update an app's state, when the useReducer hook makes no changes, then the state should not change", () => {
  const mockDefaultState: DataStructure = {
    allActivePieces: [],
    turn: COLOURS.WHITE,
    capturedPieces: [],
  };
  const defaultAction: PieceAction = { type: '', payload: '' };
  const updatedState = chessReducer(mockDefaultState, defaultAction);

  expect(updatedState).toEqual(mockDefaultState);
});
