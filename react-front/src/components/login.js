import React, { useState } from 'react';
import QRCodeComponent from './codigo';
import loginTry from './logintry';
import './login.css';

// Definición de un componente de función
function Login(setestaLogeado){
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
  

    const handleForm = (e) => {
      e.preventDefault();
      console.log("Inicio de Sesion");
      setMostrarCodigo(true);
      setestaLogeado = loginTry(formData);
      console.log('loginjs logeado = ' + setestaLogeado);
    };
    
  return (
    <div className='loginStyle'>
      <h1 className='texto'>Login</h1>
      <form className='texto' onSubmit={handleForm}>
        <label htmlFor='nombre_usuario'>Correo:</label><br></br>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor='contrasena_usuario'>Contraseña:</label><br></br>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
        />
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
