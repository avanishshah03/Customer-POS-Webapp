import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SignIn from './LoginPage.tsx'
import LandingPage from './LandingPage.tsx'
import { ManagerItems } from "./components/ManagerItems";
import { Link, Route } from 'wouter'; // Remove Route and import Link

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route path="/customer"><App /></Route>
    <Route path="/login"><SignIn /></Route>
    <Route path="/manager"><ManagerItems /></Route>
    <Route path="/"><LandingPage /></Route>
  </React.StrictMode>,
)
