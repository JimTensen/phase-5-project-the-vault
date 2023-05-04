import React, {useState, useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import GlobalStyle from '../globalStyles'
import Nav from './Nav'
import Home from './Home'
import Authentication from './Authentication'
import Login from './Login'

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch("/authorized").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);
  
    if (user) {
      return <h2>Welcome, {user.username}!</h2>;
    } else {
      return <Login onLogin={setUser} />;
    }
  }


export default App