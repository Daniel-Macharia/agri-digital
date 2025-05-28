import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './pages/auth/sign-up/components/SignUp.tsx';
import CreatePassword from './pages/auth/sign-up/components/CreatePassword.tsx';
import Otp from './pages/auth/verify-otp/component/Otp.tsx';
import Login from './pages/auth/sign-in/components/Login.tsx';
import NotFound from './NotFound.tsx';
import Home from "./pages/farmers-module/dashboard/components/Home.tsx";
import EnterPassword from './pages/auth/sign-in/components/EnterPassword.tsx';
import Content from './pages/farmers-module/dashboard/components/content/index.tsx';
import SideBar from './pages/farmers-module/dashboard/components/side-bar/index.tsx';
import TopBar from './pages/farmers-module/dashboard/components/top-bar/index.tsx';


const router = createBrowserRouter([
  {path: "/", element: <App /> },
  {path: "/create-password", element: <CreatePassword /> },
  {path:'/login', element: <Login /> },
  {path: '/enter-otp', element: <Otp />},
  {path: "/enter-password", element: <EnterPassword />},
  {path: "/home", element: <Home />},

  {path: "/top", element: <TopBar />},
  {path: "/side", element: <SideBar />},
  {path: "/content", element: <Content />},

  {path: '*', element: <NotFound />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
