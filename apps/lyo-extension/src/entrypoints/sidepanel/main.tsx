import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/tailwind.css';
import App from './App.js';

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <StrictMode>
    <App />
  </StrictMode>
);
