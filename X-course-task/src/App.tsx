import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing/Routing';
import { BooksProvider } from './contexts';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BooksProvider>
      <Routing />
    </BooksProvider>
  </React.StrictMode>
);
