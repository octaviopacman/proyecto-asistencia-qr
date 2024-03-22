import React,{useState} from 'react';
import MiComponente from './components/micomponente';
import Registro from './components/registro'


function App() {
  const[mostrarLogin, setmostrarLogin] =useState(false);
  const[mostrarRegistro, setmostrarRegistro] =useState(false);
 
  const login = {
    display:mostrarLogin ? 'block' : 'none',

  };
  const register ={
    display: mostrarRegistro ? 'block': 'none',
  };
  return (
    <div className="App">
      <button onClick={() => setmostrarLogin(!mostrarLogin)}>Mostrar/Ocultar Login</button>
      <button onClick={() => setmostrarRegistro(!mostrarRegistro)}>Mostrar/Ocultar Registro</button>
      <div className='login' style={login}>
        <MiComponente/>
      </div>
      <div className='register' style={register}>
        <Registro/>
      </div>
      
    </div>
  );
}

export default App;
