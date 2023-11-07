import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing/Routing';
import { BooksProvider, CartProvider } from './contexts';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BooksProvider>
      <CartProvider>
        <Routing />
      </CartProvider>
    </BooksProvider>
  </React.StrictMode>
);
