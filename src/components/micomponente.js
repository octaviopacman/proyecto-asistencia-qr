import React, { useState } from 'react';
import QRCodeComponent from './codigo';

// Definición de un componente de función
function MiComponente(props){
    let [mostrarCodigo, setMostrarCodigo] = useState('none');
    let [formData, setFormData] = useState({
      nombre: '',
      contrasena: '',

    });

    
    const login_style = {
        display: 'block',
        backgroundColor: 'lightgray',
        width: '300px',
        height: '600px',
        margin: 'auto',
    };
    const texto = {
        textAlign: 'center',
        paddingTop: '10px',
    };
    
    
    const codigo = {
      display: mostrarCodigo,
      padding: '10px',
      textAlign: 'center',
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  

    const handleForm = (e) => {
      e.preventDefault();
      console.log("Inicio de Sesion");
      setMostrarCodigo('block');
      console.log(formData);
    };
  return (
    <div style={login_style}>
      <h1 style={texto}>Login</h1>
      <form style={texto} onSubmit={handleForm}>
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
      <div style={codigo}>
        <QRCodeComponent data={formData.nombre} />
        <p>{formData.Nombre}</p>
      </div>
    </div>
  );
}

export default MiComponente;
