import { FC, useReducer } from 'react';
import PiecesContext, { DEFAULT_CONTEXT } from './chessApp.context';
import chessReducer from '../reducer/chessReducer';

interface PiecesProviderProps {
  children: JSX.Element;
}

const PiecesProvider: FC<PiecesProviderProps> = ({ children }) => {
  const [data, dispatch] = useReducer(chessReducer, DEFAULT_CONTEXT);

  return (
    <PiecesContext.Provider value={{ data, dispatch }}>
      {children}
    </PiecesContext.Provider>
  );
};

export default PiecesProvider;
