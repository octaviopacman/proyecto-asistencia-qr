import React, { useState } from 'react';
import QRCodeComponent from './codigo';
import './login.css';

// Definición de un componente de función
function Login(props){
    let [mostrarCodigo, setMostrarCodigo] = useState(false);
    const [formData, setFormData] = useState({
      nombre: '',
      contrasena: '',

    });
    console.log(mostrarCodigo);

    let codigo;

    if (mostrarCodigo === true){
      codigo = <QRCodeComponent data={formData.nombre}/>
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  

    const handleForm = (e) => {
      e.preventDefault();
      console.log("Inicio de Sesion");
      setMostrarCodigo(true);
      console.log(formData);
    };
    
  return (
    <div className='loginStyle'>
      <h1 className='texto'>Login</h1>
      <form className='texto' onSubmit={handleForm}>
        <label htmlFor='nombre_usuario'>Nombre de Usuario:</label><br></br>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
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
