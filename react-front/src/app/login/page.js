'use client'
import React, { useState } from 'react';
import "./login.css";
import QRCodeComponent from './codigo';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

function Login() {
  const [correo, setcorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [codigo, setCodigo] = useState('');
  const Router = useRouter();



  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://192.168.1.51:8000/login', {
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
      Router.push('/dashboard');
      console.log(data.hashqr);
      setCodigo(<QRCodeComponent data={data.hashqr} />)
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
          <label>
            <h4>Correo:</h4>
            </label>
          <input
            type="text"
            value={correo}
            onChange={(e) => setcorreo(e.target.value)}
          />
        </div>
        <div>
          <label>
            <h4>Password:</h4>  
            </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login' type="submit">Login</button>
      </form>
      <p>{message}</p>
      <div className='codigo'>
        {codigo}
      </div>
      <label>
      <p>¿No tienes cuenta?</p>
      </label>
      <button className='registro' onClick={() => Router.push('/registro')}>Registro</button>
      

    </div>
  );
}

export default Login;
