import React from 'react'
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import RecipeForm from './components/RecipeForm'


export default function App(){

      return (
              <div className="App">
                <header className="App-header">
                <header><h1>Welcome to our app!</h1></header>
          <p> Log in and then submit a recipe after you're in!</p>        
            <RecipeForm/>
      

      </header>
    </div>
  )
      }


