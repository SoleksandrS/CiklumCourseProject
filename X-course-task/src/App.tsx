import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing/Routing';
import './App.scss';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
