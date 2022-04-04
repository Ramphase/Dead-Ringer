import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessagesPage from "./pages/MessagesPage";
import SwitchesPage from "./pages/SwitchesPage";
import SettingsPage from "./pages/SettingsPage";

function App() {

  return (
    <Router >

        <Switch>
            <Route path="/" exact>
                <LoginPage />
            </Route>

            <Route path="/Register" exact>
                <RegisterPage />
            </Route>

            <Route path="/Switches" exact>
              <SwitchesPage />
            </Route>

            <Route path="/Settings" exact>
              <SettingsPage />
            </Route>

            <Route path="/Messages" exact>
              <MessagesPage />
            </Route>

            <Redirect to="/Switches" />
        </Switch>  

    </Router>
  );
}

export default App;