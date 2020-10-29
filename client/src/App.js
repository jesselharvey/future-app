import React from 'react';
import './App.css';
// import { Counter } from './features/components/counter/Counter';
import {BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Login } from './features/components/login/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
