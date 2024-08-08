'use client'
import React, { useState } from 'react';
import "./login.css";
import QRCodeComponent from './codigo';
import { useRouter } from 'next/navigation';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [codigo, setCodigo] = useState('');
  const [errors, setErrors] = useState({});
  const Router = useRouter();

  const Validacion = () => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!correo) {
      errors.correo = 'El correo es requerido';
    } else if (!emailPattern.test(correo)) {
      errors.correo = 'El correo no es válido';
    }
    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (password.length < 3) {
      errors.password = 'La contraseña debe tener 8 caracteres como mínimo';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Validacion();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleLogin(); // Llama a handleLogin para enviar los datos cuando hay 0 errores
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.19:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      console.log(data.qrToken);
      setCodigo(<QRCodeComponent data={data.qrToken} /> );
      
    } catch (error) {
      setMessage('El login falló: ' + error.message);
    }
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
    if (errors.correo) {
      setErrors((prevErrors) => ({ ...prevErrors, correo: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  }
  

  return (
    <div className='Todo'>
      <img src='appicon.png' />
      <h1>Asistencia QR</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <h4>Correo:</h4>
          </label>
          <input
            type="text"
            value={correo}
            onChange={handleCorreoChange}
            className={errors.correo ? 'input-error' : ''}
          />
          {errors.correo && <div className='mensaje-error'>{errors.correo}</div>}
        </div>
        <div>
          <label>
            <h4>Password:</h4>
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <div className="mensaje-error">{errors.password}</div>}
        </div>
        <button className='login' type="submit">Login</button>
      </form>
      {message && <p className='mensaje-error'>{message}</p>}
      <div className='codigo'>
        {codigo}
      </div>
      <button className='irmenu' onClick={() => Router.push('/dashboard')}>Ir al Menú</button>
      <label>
        <p>¿No tienes cuenta?</p>
      </label>
      <button className='registro' onClick={() => Router.push('/registro')}>Registro</button>
    </div>
  );
}

export default Login;
