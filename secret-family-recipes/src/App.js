import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
// import Login form
// import signup form
// import logout page

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
        {/* below route is just for testing api call--remove after */}
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
