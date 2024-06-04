'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import "./registro.css"

function Registro() {
  const Router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    console.log(data);

    console.log(JSON.stringify(data));
    postData(data);

  };

  const style = {
    error: {
      color: "red",
      fontSize: '11px'
    },

  };


  const postData = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/profesores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      // Here you could redirect the user or clear the form
    } catch (error) {
      console.error('Error:', error);
      // Here you could inform the user of the error
    }
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Nombre">
          <h4>NOMBRE:</h4>
          <input
            type="text"
            id="nombre"
            name="nombre"
            {...register("nombre", {
              required: 'Completa este campo',
              minLength: {
                value: 3,
                message: 'El nombre es muy corto',
              },
              maxLength: {
                value: 30,
                message: 'El nombre es muy largo',
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Solo se aceptan letras',
              }
            })}
          />
          {
            errors.nombre && <p>{errors.nombre.message}</p>
          }



        </label>
        <br />

        <label htmlFor="Apellido">
          <h4>APELLIDO:</h4>
          <input
            type="text"
            id="Apellido"
            {...register("Apellido", {
              required: 'Completa el campo',
              minLength: {
                value: 3,
                message: 'El apellido es muy corto',
              },
              maxLength: {
                value: 40,
                message: 'El nombre es muy corto',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Ingrese solo letras',
                }
              }
            })}

          />
          {
            errors.Apellido && <p>{errors.Apellido.message}</p>
          }
        </label>
        <br />

        <label htmlFor="Telefono">
          <h4>TELEFONO:</h4>
          <input
            type="tel"
            id="Telefono"
            {...register("Telefono", {
              required: 'Completa este campo',
              minLength: {
                value: 10,
                message: 'Ingrese minimo 10 caracteres',
              },
              pattern: {
                value: /^\d+$/,
                message: 'Ingrese solo numeros',
              }
            })}
            placeholder="ej: 1123456789"
          />
          {
            errors.Telefono && <p>{errors.Telefono.message}</p>
          }

        </label>
        <br />



        <label htmlFor="Correo">
          <h4>CORREO:</h4>
          <input
            type="email"
            id="Correo"
            {...register("Correo", {
              requiered: 'Completa este campo',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingrese un correo valido',
              }
            })}
          />
          {
            errors.Correo && <p>{errors.Correo.message}</p>
          }
        </label>
        <br />

        <label htmlFor="DNI">
          <h4>DNI:</h4>
          <input
            type="text"
            id="DNI"
            {...register("DNI", {
              requiered: 'Complete este campo',
              minLength: {
                value: 8,
                message: 'El DNI debe tener como minimo 8 caracteres',
              },
              maxLength: {
                value: 10,
                message: 'El DNI debe tener como maximo 10 caracteres',
              },
              pattern: {
                value: /^\d+$/,
                message: 'Ingrese solo numeros'
              }
            })}

          />
          {
            errors.DNI && <p>{errors.DNI.message}</p>
          }
        </label>
        <br />


        <label htmlFor="Contrasena">
          <h4>CONTRASEÑA:</h4>
          <input
            type="password"
            id="ContrasenaHash"
            {...register("ContrasenaHash", {
              required: 'Completa este campo',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener 8 caracteres como minimos',
              },
            })}
          />
          {
            errors.ConstrasenaHash && <p>{errors.ConstrasenaHash.message}</p>
          }
        </label>
        <br />

        <input type="submit" />
      </form>
      <button className='boton' onClick={() => Router.push('/login')}>Volver al Inicio de Sesión</button>

    </div>
  );
}
export default Registro;
