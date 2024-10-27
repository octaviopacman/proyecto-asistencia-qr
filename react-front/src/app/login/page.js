'use client'
import React, { useState } from 'react';
import styles from './login.module.css';
import QRCodeComponent from './codigo';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from '../assets/session';
import Link from 'next/link';
import { Sesion } from '../assets/conexiones';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [codigo, setCodigo] = useState('');
  const [errors, setErrors] = useState({});
  const [rol, setRol] = useState(''); // Nueva variable de estado para el rol
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
    } else if (password.length < 8) {
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
    if (rol === 'profesor') {
      Router.push('/dashboard', undefined, { shallow: true });
    } else if (rol === 'admin') {
      Router.push('/admin', undefined, { shallow: true });
    }
  };

  const handleLogin = async () => {
    let credenciales = new Sesion(useSession);
    let usuario = await credenciales.iniciarSesion(correo, password);
    if (usuario.error) {
      setMessage(usuario.error);
    } else {
      setMessage('');
      setErrors({});
      login(usuario);
      setRol(usuario.rol); // Establece el rol devuelto por la API
      setCodigo(<QRCodeComponent data={usuario.token} />);
      console.log(usuario);
    }
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
    if (errors.correo) {
      setErrors((prevErrors) => ({ ...prevErrors, correo: '' }));
    }
    setMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
    setMessage('');
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
      </div>
    </div>
  );
}

export default Login;
