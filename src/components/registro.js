import React, { useState } from 'react';
import "./registro.css";

function Registro()
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

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                value={formData.nombre}
                onChange={handleChange}
            ></input>
        </label><br></br>

        <label htmlFor="apellido"><h4>APELLIDO:</h4>
            <input type="text"
            value={formData.apellido}
            onChange={handleChange}
            id="apellido"></input>
        </label><br></br>

        <label htmlFor="telefono"><h4>TELEFONO:</h4>
            <input type="number"
            value={formData.telefono}
            onChange={handleChange}
             id="telefono" placeholder="ej: 1123456789"></input>
        </label>

        <label htmlFor="domicilio"><h4>DOMICILIO:</h4>
            <input type="text"
            value={formData.domicilio}
            onChange={handleChange} 
            id="domicilio"></input>
        </label><br></br>

        <label htmlFor="dni"><h4>DNI:</h4>
            <input type="number"
            value={formData.dni}
            onChange={handleChange}
            id="dni"></input>
        </label>

        <label htmlFor="contrasena">
            <h4>CONTRASEÑA:</h4>
          
            <input type="password"
            value={formData.contrasena}
            onChange={handleChange}
            id="contrasena1"></input>
            <h4>REPETI TU CONTRASEÑA:</h4>
            <input type="password"
            value={formData.contrasena2}
            onChange={handleChange}
            id="contrasena2"></input>
        </label><br></br>
        
        <input type="submit">
        </input> 
    </form>
    </div>
      
    )
}
export default Registro;