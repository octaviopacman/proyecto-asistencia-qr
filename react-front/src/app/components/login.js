import React, { useState } from 'react';
import "./login.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      setMessage(`Welcome ${data.username}!`);
    } catch (error) {
      setMessage('Login failed: ' + error.message);
    }
  };

  return (
    <div className='Todo'>
      <h1>Asistencia QR</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='boton' type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
