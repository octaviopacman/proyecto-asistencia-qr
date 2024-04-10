import React, { useState } from 'react';
import axios from 'axios';
import "./registro.css";

const URI = 'http://localhost:8000/profesores';

function Registro(props)
{
    const [formData, setFormData] = useState({
      Nombre: '',
      Apellido: '',
      DNI: '',
      Telefono: '',
      Correo: '',
      Domicilio: '',
      ContrasenaHash: '',
      
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
        
        
        console.log(JSON.stringify(formData));


        axios.post('http://localhost:8000/profesores', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Success:', response.data);
            // Aquí podrías redirigir al usuario o limpiar el formulario
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí podrías informar al usuario del error
        });
    }

    return(
        <div className="register">
        <h1>Registro</h1>
        <form onSubmit={handleForm}>
        <label htmlFor="Nombre"><h4>NOMBRE:</h4>
            <input
                type="text"
                id="Nombre"
                name='Nombre'
                value={setFormData.Nombre}
                onChange={handleChange}
            ></input>
        </label><br></br>

        <label htmlFor="Apellido"><h4>APELLIDO:</h4>
            <input type="text"
            name='Apellido'
            value={setFormData.Apellido}
            onChange={handleChange}
            id="Apellido"></input>
        </label><br></br>

        <label htmlFor="Telefono"><h4>TELEFONO:</h4>
            <input type="number"
            name='Telefono'
            value={setFormData.Telefono}
            onChange={handleChange}
             id="Telefono" placeholder="ej: 1123456789"></input>
        </label>

        <label htmlFor="Domicilio"><h4>DOMICILIO:</h4>
            <input type="text"
            name='Domicilio'
            value={setFormData.Domicilio}
            onChange={handleChange} 
            id="Domicilio"></input>
        </label><br></br>

        <label htmlFor="Domicilio"><h4>CORREO:</h4>
            <input type="text"
            name='Correo'
            value={setFormData.Correo}
            onChange={handleChange} 
            id="Correo"></input>
        </label><br></br>

        <label htmlFor="DNI"><h4>DNI:</h4>
            <input type="number"
            name='DNI'
            value={setFormData.DNI}
            onChange={handleChange}
            id="DNI"></input>
        </label>

        <label htmlFor="contrasena">
            <h4>CONTRASEÑA:</h4>
          
            <input type="text"
            name='ContrasenaHash'
            value={setFormData.ContrasenaHash}
            onChange={handleChange}
            id="ContrasenaHash"></input>
        </label><br></br>

        
        
        <input type="submit">
        </input> 
    </form>
    </div>
      
    )
}
export default Registro;