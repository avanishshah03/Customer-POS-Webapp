import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Customer.tsx'
import SignIn from './LoginPage.tsx'
import LandingPage from './LandingPage.tsx'
import { ManagerItems } from "./components/ManagerItems";
import { ManagerIngredients } from "./components/ManagerIngredients";
import { Link, Route } from 'wouter'; // Remove Route and import Link
import { Server } from './components/Server.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route path="/customer"><App /></Route>
    <Route path="/login"><SignIn /></Route>
    <Route path="/managerItems"><ManagerItems /></Route>
    <Route path="/server"><Server /></Route>
    <Route path="/managerIngredients"><ManagerIngredients /></Route>
    <Route path="/"><LandingPage /></Route>

  </React.StrictMode>,
)
