import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPage from './pages/ForgotPage';
import ResetPage from './pages/ResetPage'
import MessagesPage from "./pages/MessagesPage";
import ContactsPage from './pages/ContactsPage';
import SwitchesPage from "./pages/SwitchesPage";
import MessageContextProvider from './components/messages/context/MessageContext';

function App() {

  return (
    <Router>

        <Switch>
            <Route path="/" exact>
                <LoginPage />
            </Route>

            <Route path="/Register" exact>
                <RegisterPage />
            </Route>

            <Route path="/Forgot" exact>
                <ForgotPage />
            </Route>

            <Route path="/Reset" exact>
                <ResetPage />
            </Route>
            
            <Route path="/Switches" exact>
              <SwitchesPage />
            </Route>
       
            <Route path="/Contacts" exact>
              <ContactsPage />
            </Route>

            <MessageContextProvider>
            <Route path="/Messages" exact>
              <MessagesPage />
            </Route>
            </MessageContextProvider>
            
            

            <Redirect to="/" />
        </Switch>  

    </Router>
  );
}

export default App;
