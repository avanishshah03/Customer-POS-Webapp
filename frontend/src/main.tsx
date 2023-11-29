import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './Auth.tsx'
import App from './Customer.tsx'
import SignIn from './LoginPage.tsx'
import LandingPage from './LandingPage.tsx'
import { Route } from 'wouter';
import { Server } from './components/Server.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import { Manager } from './Manager.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com">
      <AuthContextProvider>
        <BrowserRouter>
          <Route path="/customer"><App /></Route>
          <Route path="/login"><SignIn /></Route>
          <Route path="/manager"> <Manager /></Route>
          <Route path="/server"><Server /></Route>
          <Route path="/"><LandingPage /></Route>
        </BrowserRouter>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
