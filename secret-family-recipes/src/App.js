import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      <Switch>
        <PrivateRoute exact path="/protected" component={UserProfile} />
        <Route path="/userprofile" component={UserProfile} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/signup" component={Signup} /> */}
        {/* <Route path="/logout" component={Logout} /> */}
      </Switch>
      </div>
    </Router>
  );
}

export default App;
