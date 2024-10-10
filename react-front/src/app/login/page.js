'use client'
import React, { useState } from 'react';
import styles from './login.module.css';
import QRCodeComponent from './codigo';
import { useRouter } from 'next/navigation';
import { useSession } from '../assets/session';

import Image from 'next/image';
import Link from 'next/link';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [codigo, setCodigo] = useState('');
  const [errors, setErrors] = useState({});
  const Router = useRouter();
  const { user, login, logout } = useSession();



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
      await handleLogin(); // Llama a handleLogin para enviar los datos cuando hay 0 errores
    }
  }

  const handleMenuNavigation = () => {
    Router.push('/dashboard', undefined, { shallow: true });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
        credentials:'include',
      });

      const data = await response.json(); 
      setCodigo(<QRCodeComponent data={data.qrToken} />);
      login(data);
      console.log(user);

      

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
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src='appicon.png' className={styles.loginIcon} />
        <h1>Asistencia QR</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label>Correo</label>
            <input
              type="text"
              value={correo}
              onChange={handleCorreoChange}
              className={errors.correo ? styles.inputError : styles.input}
              placeholder='Ingrese su correo electrónico'
            />
            {errors.correo && <div className={styles.mensajeError}>{errors.correo}</div>}
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? styles.inputError : styles.input}
              placeholder='Ingrese una contraseña'
            />
            {errors.password && <div className={styles.mensajeError}>{errors.password}</div>}
          </div>
          <button className={styles.btnLogin} type="submit">Login</button>
        </form>
        {message && <p className={styles.mensajeError}>{message}</p>}
        <div className={styles.codigo}>
          {codigo}
        </div>
        <button className={styles.btnMenu} onClick={handleMenuNavigation}>Ir al Menú</button>
        <label>
          <p>¿No tienes cuenta?</p>
        </label>
        <button className={styles.btnRegister} onClick={() => Router.push('/registro')}>Registro</button>
      </div>
    </div>
  );
}

export default Login;
