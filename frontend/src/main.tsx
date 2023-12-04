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
    path: '/manager',
    element: <ProtectedRoute element={<Manager />} auths={['ROLE_manager']} />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/server',
    element: <ProtectedRoute element={<Server />} auths={['ROLE_manager', 'ROLE_server']} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
