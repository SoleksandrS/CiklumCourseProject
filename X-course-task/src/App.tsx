import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing/Routing';
import { BooksProvider, CartProvider, UserProvider } from './contexts';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BooksProvider>
      <CartProvider>
        <UserProvider>
          <Routing />
        </UserProvider>
      </CartProvider>
    </BooksProvider>
  </React.StrictMode>
);
