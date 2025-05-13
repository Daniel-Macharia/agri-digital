import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Otp from './otp.tsx';
import Login from './login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

    <Otp />

    <Login />
  </StrictMode>,
)
