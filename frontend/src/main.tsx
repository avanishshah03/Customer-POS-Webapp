import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { Server } from './components/Server.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Auth.tsx'
import Customer from './Customer.tsx'
import SignIn from './LoginPage.tsx'
import { LandingPage } from './LandingPage.tsx'
import { Manager } from './Manager.tsx';
import { Unauthorized } from './Unauthorized.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Admin } from './Admin.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/customer',
    element: <Customer />,
  },
  {
    path: '/server',
    element: <ProtectedRoute element={<Server />} auths={['ROLE_admin', 'ROLE_manager', 'ROLE_server']} />,
  },
  {
    path: '/manager',
    element: <ProtectedRoute element={<Manager />} auths={['ROLE_admin', 'ROLE_manager']} />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute element={<Admin />} auths={['ROLE_admin']} />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
)
