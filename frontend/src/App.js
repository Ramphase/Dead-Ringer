import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  return (
    <Router>
    <Switch>
      <Route exact path = "/"><Login/></Route>
      <Route path = "/register"><Register/></Route>
    </Switch>
    </Router>
  );
}

export default App;