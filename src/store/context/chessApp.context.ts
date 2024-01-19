import { Dispatch, createContext } from 'react';
import { PieceAction, COLOURS, DataStructure } from '../../static-data/types';
import { ALL_INITIAL_PIECES } from '../../static-data/constants';

interface PiecesContextStructure {
  data: DataStructure;
  dispatch: Dispatch<PieceAction>;
}

export const DEFAULT_CONTEXT = {
  allActivePieces: ALL_INITIAL_PIECES,
  turn: COLOURS.WHITE,
  capturedPieces: [],
};

const PiecesContext = createContext<PiecesContextStructure>({
  data: DEFAULT_CONTEXT,
  dispatch: () => {},
});

export default PiecesContext;
