import React, { useState } from 'react';
import "./login.css"
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const [correo, setcorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [irARegistro, setIrARegistro] = useState(false);
  const [Sesion, setSesion] = useState(false);

  if (Sesion) {
    return <Navigate to="/admin" />
  }

  if (irARegistro) {
    return <Navigate to="/registro" />
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      setMessage(`Bienvenido ${data.correo}!`);
      setSesion(!Sesion);
    } catch (error) {
      setMessage('El login falló: ' + error.message);
    }
  };

  return (
    <div className='Todo'>
      <img src='appicon.png' />
      <h1>Asistencia QR</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo:</label><br/>
          <input
            type="text"
            value={correo}
            onChange={(e) => setcorreo(e.target.value)}
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
      <button className='boton' onClick={() => setIrARegistro(!irARegistro)}>Registro</button>
    </div>
  );
}

export default Login;
