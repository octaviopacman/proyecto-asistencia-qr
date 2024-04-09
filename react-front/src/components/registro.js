import React, { useState } from 'react';
import axios  from 'axios';
import "./registro.css";

const URI = 'http://localhost:8000/profesores'

function Registro(props)
{
    const [formData, setFormData] = useState({
      nombre: '',
      apellido: '',
      contrasena: '',
      contrasena2: '',
      domicilio: '',
      telefono: '',
      dni: '',

    });

    //// Arreglado, cada formulario debe llevar un "name" en cada input.
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
      const handleForm = (e) => {
        e.preventDefault(); 
        console.log("Inicio de Sesion");
        console.log(formData);
      };

    return(
        <div className="register">
        <h1>Registro</h1>
        <form onSubmit={handleForm}>
        <label htmlFor="nombre"><h4>NOMBRE:</h4>
            <input
                type="text"
                id="nombre"
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
            ></input>
        </label><br></br>

        <label htmlFor="apellido"><h4>APELLIDO:</h4>
            <input type="text"
            name='apellido'
            value={formData.apellido}
            onChange={handleChange}
            id="apellido"></input>
        </label><br></br>

        <label htmlFor="telefono"><h4>TELEFONO:</h4>
            <input type="number"
            name='telefono'
            value={formData.telefono}
            onChange={handleChange}
             id="telefono" placeholder="ej: 1123456789"></input>
        </label>

        <label htmlFor="domicilio"><h4>DOMICILIO:</h4>
            <input type="text"
            name='domicilio'
            value={formData.domicilio}
            onChange={handleChange} 
            id="domicilio"></input>
        </label><br></br>

        <label htmlFor="dni"><h4>DNI:</h4>
            <input type="number"
            name='dni'
            value={formData.dni}
            onChange={handleChange}
            id="dni"></input>
        </label>

        <label htmlFor="contrasena">
            <h4>CONTRASEÑA:</h4>
          
            <input type="password"
            name='contrasenia'
            value={formData.contrasena}
            onChange={handleChange}
            id="contrasenia"></input>
        </label><br></br>
        
        <input type="submit">
        </input> 
    </form>
    </div>
      
    )
}
export default Registro;