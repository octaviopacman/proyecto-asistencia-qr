import React, { useState } from 'react';
import QRCodeComponent from './codigo';
import loginTry from './logintry';
import './login.css';

import {useForm } from 'react-hook-form';

// Definición de un componente de función
function Login(setestaLogeado){
  const {register, handleSubmit,formState: {errors}} = useForm();

  const onSubmit = (data) => {

    console.log(data);

    console.log(JSON.stringify(data));
    postData(data);

  };

    const [mostrarCodigo, setMostrarCodigo] = useState(false);
    const [formData, setFormData] = useState({
      correo: '',
      contrasena: '',

    });

    let codigo;

    if (mostrarCodigo === true){
      codigo = <QRCodeComponent data={formData.correo}/> ///// A cambiar
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
   //la ruta del login es http://localhost:8000/login
    const handleForm = (e) => {
      e.preventDefault();
      console.log("Inicio de Sesion");
      setMostrarCodigo(true);
      setestaLogeado = loginTry(formData);
      console.log('loginjs logeado = ' + setestaLogeado);
      //algo asi tienen que poner, pero ni idea, arreglense ustedes con el front, el back anda perfecccttt
     /*  const info = {
        correo: formData.correo,
        password: formData.contrasena
      };
    
      // Hacer la solicitud de inicio de sesión al servidor
      fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      }) */
      
      
    };
   

    
    
    
  return (
    <div className='loginStyle'>
      <h1 className='texto'>Login</h1>
      <form className='texto' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='nombre_usuario'>Correo:</label><br></br>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          {...register("correo",{
            requiered:'Completa este campo',
              pattern:{
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message:'Ingrese un correo valido',
              },
          })}

          
        />
        {
          errors.correo && <p>{errors.correo.message}</p>
        }
        <br></br>
        <label htmlFor='contrasena_usuario'>Contraseña:</label><br></br>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          {...register("contrasena",{
            required:'Completa este campo',
              minLength:{
                value:8,
                message:'La contraseña debe tener 8 caracteres como minimos',
              },
          })}
         
        />
        {
          errors.contrasena && <p>{errors.contrasena.message}</p>
        }
        <br></br>

        <button type="submit" id='login'>Iniciar Sesión</button>
      </form>

      <div>
        {codigo}
        <p>{formData.nombre}</p>
      </div>
    </div>
  );
}

export default Login;
