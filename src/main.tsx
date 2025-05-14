import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import CreatePassword from './CreatePassword.tsx';
import Otp from './Otp.tsx';
import Login from './Login.tsx';
import NotFound from './NotFound.tsx'


const router = createBrowserRouter([
  {path: "/", element: <App /> },
  {path: "/create-password", element: <CreatePassword /> },
  {path:'/login', element: <Login /> },
  {path: '/otp', element: <Otp />},
  {path: '*', element: <NotFound />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
