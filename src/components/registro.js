import React from "react";
import "./registro.css";

function registro()
{
    
    return(
        <div className="register">
        <h1>Registro</h1><form>
        <label htmlFor="nombre"><h4>NOMBRE:</h4>
        
            <input
                type="text"
                id="nombre"
                required
            ></input>
        </label><br></br>

        <label htmlFor="apellido"><h4>APELLIDO:</h4>
            <input type="text"
            id="apellido"></input>
        </label><br></br>

        <label htmlFor="telefono"><h4>TELEFONO:</h4>
            <input type="number"
             id="telefono" placeholder="ej: 1123456789"></input>
        </label>

        <label htmlFor="domicilio"><h4>DOMICILIO:</h4>
            <input type="text" 
            id="domicilio"></input>
        </label><br></br>

        <label htmlFor="dni"><h4>DNI:</h4>
            <input type="number"
            id="dni"></input>
        </label>

        <label htmlFor="contrasena">
            <h4>CONTRASEÑA:</h4>
          
            <input type="password"
            id="contrasena1"></input>
            <h4>REPETI TU CONTRASEÑA:</h4>
            <input type="password"
            id="contrasena2"></input>
        </label><br></br>
        
        <input type="submit">
        </input> 
    </form>
    </div>
      
    )
}
export default registro;