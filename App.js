// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import BuyOTP from './components/BuyOTP';
import Deposit from './components/Deposit';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/auth/user', {
        headers: { 'x-auth-token': token }
      })
      .then(res => {
        setIsAuthenticated(true);
        setUser(res.data);
      })
      .catch(err => {
        localStorage.removeItem('token');
      });
    }

    // Load countries and services
    axios.get('/api/otp/countries')
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => 
          isAuthenticated ? 
            <Dashboard user={user} /> : 
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        } />
        <Route path="/register" component={Register} />
        <Route path="/buy" render={() => 
          isAuthenticated ? 
            <BuyOTP user={user} countries={countries} services={services} /> : 
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        } />
        <Route path="/deposit" render={() => 
          isAuthenticated ? 
            <Deposit user={user} setUser={setUser} /> : 
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        } />
      </Switch>
    </Router>
  );
}

export default App;
