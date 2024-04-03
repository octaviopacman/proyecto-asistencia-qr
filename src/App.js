import React,{useState} from 'react';
import Login from './components/login';
import Registro from './components/registro'
import CompShowBlogs from './components/showBlogs';
import './App.css'


function App() {
  
  const[estaRegistrado, setestaRegistrado] =useState(false);
 
  
  let contenido;
  let contenidoBoton;
  if (estaRegistrado){
    contenido = <Registro/>;
    contenidoBoton = 'Volver al inicio de sesion';
  } else {
    contenido = <Login/>;
    contenidoBoton = 'No estas registrado?';
  }

  return (
    <div className="App">
      {contenido}
      <button onClick={() => setestaRegistrado(!estaRegistrado)}>{contenidoBoton}</button>
      <CompShowBlogs />
    </div>
  );
}

export default App;
