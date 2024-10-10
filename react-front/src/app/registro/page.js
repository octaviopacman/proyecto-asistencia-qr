'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './registro.module.css'; // Importar el módulo CSS

function Registro() {
  const Router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    postData(data);
  };

  const postData = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/profesores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.containerDiv}> {/* Estilo del contenedor principal */}
      <div className={styles.registroBox}> {/* Caja de registro */}
        <h1>Registro</h1>
        <form className={styles.registroForm} onSubmit={handleSubmit(onSubmit)}> {/* Aplicando la clase al formulario */}
          <div className={styles.formGroup}>
            <label htmlFor="nombre">NOMBRE:</label>
            <input
              type="text"
              id="nombre"
              {...register("nombre", {
                required: 'Completa este campo',
                minLength: { value: 3, message: 'El nombre es muy corto' },
                maxLength: { value: 30, message: 'El nombre es muy largo' },
                pattern: { value: /^[A-Za-z]+$/, message: 'Solo se aceptan letras' },
              })}
              className={styles.input}
            />
            {errors.nombre && <p className={styles.mensajeError}>{errors.nombre.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Apellido">APELLIDO:</label>
            <input
              type="text"
              id="Apellido"
              {...register("Apellido", {
                required: 'Completa el campo',
                minLength: { value: 3, message: 'El apellido es muy corto' },
                maxLength: { value: 40, message: 'El nombre es muy corto' },
                pattern: { value: /^[A-Za-z]+$/, message: 'Ingrese solo letras' },
              })}
              className={styles.input}
            />
            {errors.Apellido && <p className={styles.mensajeError}>{errors.Apellido.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Telefono">TELEFONO:</label>
            <input
              type="tel"
              id="Telefono"
              {...register("Telefono", {
                required: 'Completa este campo',
                minLength: { value: 10, message: 'Ingrese minimo 10 caracteres' },
                pattern: { value: /^\d+$/, message: 'Ingrese solo numeros' },
              })}
              placeholder="ej: 1123456789"
              className={styles.input}
            />
            {errors.Telefono && <p className={styles.mensajeError}>{errors.Telefono.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Correo">CORREO:</label>
            <input
              type="email"
              id="Correo"
              {...register("Correo", {
                required: 'Completa este campo',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingrese un correo valido' },
              })}
              className={styles.input}
            />
            {errors.Correo && <p className={styles.mensajeError}>{errors.Correo.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="DNI">DNI:</label>
            <input
              type="text"
              id="DNI"
              {...register("DNI", {
                required: 'Complete este campo',
                minLength: { value: 8, message: 'El DNI debe tener como minimo 8 caracteres' },
                maxLength: { value: 10, message: 'El DNI debe tener como maximo 10 caracteres' },
                pattern: { value: /^\d+$/, message: 'Ingrese solo numeros' },
              })}
              className={styles.input}
            />
            {errors.DNI && <p className={styles.mensajeError}>{errors.DNI.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ContrasenaHash">CONTRASEÑA:</label>
            <input
              type="password"
              id="ContrasenaHash"
              {...register("ContrasenaHash", {
                required: 'Completa este campo',
                minLength: { value: 8, message: 'La contraseña debe tener 8 caracteres como minimos' },
              })}
              className={styles.input}
            />
            {errors.ContrasenaHash && <p className={styles.mensajeError}>{errors.ContrasenaHash.message}</p>}
          </div>

          <button type="submit" className={styles.btnSubmit}>Registrar</button>
        </form>
        <button className={styles.boton} onClick={() => Router.push('/login')}>Volver al Inicio de Sesión</button>
      </div>
    </div>
  );
}

export default Registro;
