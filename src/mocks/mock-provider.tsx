import { FC, useMemo, useReducer } from 'react';
import PiecesContext from '../store/context/chessApp.context';
import { DataStructure } from '../static-data/types';
import chessReducer from '../store/reducer/chessReducer';

interface MockProviderProps {
  children: JSX.Element;
  preloadedState: DataStructure;
}

const MockProvider: FC<MockProviderProps> = ({ children, preloadedState }) => {
  const mockStateUpdate = useReducer(chessReducer, preloadedState);

  const optimizedMockStateUpdate = useMemo(() => {
    const [data, dispatch] = mockStateUpdate;
    return { data, dispatch };
  }, [mockStateUpdate]);

  return (
    <PiecesContext.Provider value={optimizedMockStateUpdate}>
      {children}
    </PiecesContext.Provider>
  );
};

export default MockProvider;
