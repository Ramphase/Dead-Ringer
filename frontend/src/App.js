import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Messages from "./pages/Messages"
import NotificationSettings from "./pages/NotificationSettings"
import Switches from "./pages/Switches"
import TriggerSettings from "./pages/TriggerSettings"

function App() {

  return (
    <Router >
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
      </style>
            <Switch>
                <Route path="/Login" exact>
                    <LoginPage />
                </Route>
                <Route path="/Register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/Login" />
                <Route path='/' exact component={Homepage} /> 
                <Route path='/Switches' exact component={Switches} />
                <Route path='/TriggerSettings' component={TriggerSettings} />
                <Route path='/Messages' component={Messages} />
                <Route path='/NotificationSettings' component={NotificationSettings} />
            </Switch>  

         
        </Router>
  );
}

export default App;
