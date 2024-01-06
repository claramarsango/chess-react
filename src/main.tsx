import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';
import PiecesProvider from './store/context/Pieces.provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PiecesProvider>
      <App />
    </PiecesProvider>
  </React.StrictMode>,
);
