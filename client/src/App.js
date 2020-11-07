import React from 'react';
import './App.css';
// import { Counter } from './features/components/counter/Counter';
import {BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Login } from './features/components/auth/Login'
import { Register } from './features/components/auth/Register'
import AuthRoute from './features/authentication/AuthRoute'
import { Dashboard } from './features/components/dashboard/Dashboard'
import { GoalForm } from './features/components/goals/goalForm'
import { GoalPage } from './features/components/goals/goalPage'
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
      <AuthRoute path='/goal-form'>
        <GoalForm />
      </AuthRoute>
      <AuthRoute path='/test'>
        <Test />
      </AuthRoute>

      {/* <AuthRoute path='/goal:id'>
      </AuthRoute> */}
    </Switch>
  </Router>
  )
}

export default App;
