import { FC, useMemo, useReducer } from 'react';
import PiecesContext, { DEFAULT_CONTEXT } from './chessApp.context';
import chessReducer from '../reducer/chessReducer';

interface PiecesProviderProps {
  children: JSX.Element;
}

const PiecesProvider: FC<PiecesProviderProps> = ({ children }) => {
  const stateUpdate = useReducer(chessReducer, DEFAULT_CONTEXT);

  const optimizedStateUpdate = useMemo(() => {
    const [data, dispatch] = stateUpdate;
    return { data, dispatch };
  }, [stateUpdate]);

  return (
    <PiecesContext.Provider value={optimizedStateUpdate}>
      {children}
    </PiecesContext.Provider>
  );
};

export default PiecesProvider;
