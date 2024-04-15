import React,{useState} from 'react';
import Login from './components/login';
import RegistroNuevo from './components/registronuevo';

import Admin from './components/admin';

function App() {
  
  const[estaRegistrado, setestaRegistrado] =useState(false);
  const[estaLogeado, setestaLogeado] = useState(false);
 
  
  let contenido;
  let contenidoBoton;
  let mostrarBoton;
  if (estaRegistrado){
    contenido = <RegistroNuevo/>;
    contenidoBoton = 'Volver al inicio de sesion';
  } else {
    contenido = <Login />;
    console.log('appjs' + estaLogeado);
    contenidoBoton = 'No estas registrado?';
  }

  if (estaLogeado) {
    console.log('0' + estaLogeado);
  
    contenido = <Admin/>;
    
  }

  return (
    <div className="App">
      {contenido}
      <button style={mostrarBoton} onClick={() => setestaRegistrado(!estaRegistrado)}>{contenidoBoton}</button>
      
    </div>
  );
}

export default App;
