import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessagesPage from "./pages/MessagesPage";
import ContactsPage from './pages/ContactsPage';
import SwitchesPage from "./pages/SwitchesPage";
import SettingsPage from "./pages/SettingsPage";
import MessageContextProvider from './components/messages/context/MessageContext';
import ContactContextProvider from './components/contacts/context/ContactContext';
import SwitchContextProvider from './components/switches/contexts/SwitchContext';

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
    
            <SwitchContextProvider>
            <Route path="/Switches" exact>
              <SwitchesPage />
            </Route>
            <SwitchContextProvider>
    
            <Route path="/Settings" exact>
              <SettingsPage />
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
