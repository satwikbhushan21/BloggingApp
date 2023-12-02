// LoginPage.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      history.push('/homepage');
    } else {
      alert('Invalid username or password'); // Display a pop-up alert for invalid login
    }
  };

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <p>
          Not registered? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
