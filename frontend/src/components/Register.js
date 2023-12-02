// RegisterPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      // Redirect to the login page after successful registration
      history.push('/');
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error as needed (e.g., show an error message to the user)
    }
  };

  const handleLoginRedirect = () => {
    history.push('/');
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <br />
        <p>
          Already registered? <a href="#!" onClick={handleLoginRedirect}>Login here</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
