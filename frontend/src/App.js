// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';
import RegisterPage from './components/Register'; // Import the new component
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/register" component={RegisterPage} /> {/* Add the new route */}
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
