import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
// import logout page

import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import RecipeForm from './components/RecipeForm'


export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div> 
          <p> Log in and then submit a recipe after you're in!</p>        
            <RecipeForm/>
        </div>
      <Switch>
        <PrivateRoute exact path="/protected" component={UserProfile} />
        {/* below route is just for testing api call--remove after */}
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/logout" component={Logout} /> */}
      </Switch>
      </div>
    </Router>
  );
}

