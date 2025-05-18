import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
// Remove if not used:
// import { SnackbarProvider } from 'notistack';

// Get root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render your app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
