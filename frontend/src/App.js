import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import MessagesPage from "./pages/MessagesPage";
import NotificationSettingsPage from "./pages/NotificationSettingsPage";
import SwitchesPage from "./pages/SwitchesPage";
import TriggerSettingsPage from "./pages/TriggerSettingsPage";

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

            <Route path="/Homepage" exact>
              <Homepage />
            </Route>

            <Route path="/Switches" exact>
              <SwitchesPage />
            </Route>

            <Route path="/TriggerSettings" exact>
              <TriggerSettingsPage />
            </Route>

            <Route path="/Messages" exact>
              <MessagesPage />
            </Route>

            <Route path="/NotificationSettings" exact>
              <NotificationSettingsPage />
            </Route>

            <Redirect to="/Homepage" />
        </Switch>  

    </Router>
  );
}

export default App;