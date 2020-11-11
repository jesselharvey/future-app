import React from 'react';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Login } from './features/components/auth/Login'
import { Register } from './features/components/auth/Register'
import AuthRoute from './features/authentication/AuthRoute'
import { Dashboard } from './features/components/dashboard/Dashboard'
import { GoalPage } from './features/components/goals/GoalPage'
import { Test } from './features/components/Test'


function App() {
  return (
  <Router>
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <AuthRoute path='/dashboard'>
        <Dashboard />
      </AuthRoute>
      <AuthRoute path='/goal/:goalId'>
        <GoalPage />
      </AuthRoute>
      <AuthRoute path='/test'>
        <Test />
      </AuthRoute>
    </Switch>
  </Router>
  )
}

export default App;
