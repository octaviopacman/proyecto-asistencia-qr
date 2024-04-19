'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, {useState} from "react";
import Registro from "./components/registronuevo"
import Login from "./components/login"
import Admin from "./components/admin"
import Header from "./components/header"


export default function Home() {
  const[estaRegistrado, setestaRegistrado] =useState(false);
  const[estaLogeado, setestaLogeado] = useState(false);
 
  
  let contenido;
  let contenidoBoton;
  let mostrarBoton;

  //// ARREGLAR, SE DEBE UTILIZAR DISPLAY PARA CADA COMPONENTE
  if (estaRegistrado){
    contenido = <Registro/>;
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
      <div className="contenido">
        {contenido}
      </div>
      <button style={mostrarBoton} onClick={() => setestaRegistrado(!estaRegistrado)}>{contenidoBoton}</button>
      
    </div>
  );
}
