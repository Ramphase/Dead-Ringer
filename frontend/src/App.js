import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function App() {

  return (
    <Router >
            <Switch>
                <Route path="/Login" exact>
                    <LoginPage />
                </Route>
                <Route path="/Register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/Login" />
            </Switch>  
        </Router>
  );
}

export default App;