import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { DomainProvider } from './components/DomainContext/DomainContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DomainProvider>
      <App />
    </DomainProvider>
  </BrowserRouter>
);

