import React from 'react';
import Register from './components/Register';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function App() {

  return (
    <Router >
            <Switch>
                <Route path="/Login" exact>
                    <Login />
                </Route>
                <Route path="/Register" exact>
                    <Register />
                </Route>
                <Redirect to="/Login" />
            </Switch>  
        </Router>
  );
}

export default App;