import React, { useState, useEffect } from 'react';

const Clases = [
  { nombre: 'Matemáticas', horaInicio: { hora: 7, minuto: 30 } },
  { nombre: 'Lengua', horaInicio: { hora: 11, minuto: 30 } },
  { nombre: 'Filosofía', horaInicio: { hora: 15, minuto: 0 } }
];

const TiempoParaClases = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [proximaClase, setProximaClase] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000); // Actualiza la hora cada segundo

    return () => clearInterval(interval);
  }, []); // Se ejecuta solo una vez al cargar el componente

  useEffect(() => {
    // Encuentra la próxima clase
    const horaActualLocal = horaActual.getHours() * 60 + horaActual.getMinutes();
    let proximaClaseIndex = null;

    for (let i = 0; i < Clases.length; i++) {
      const horaClase = Clases[i].horaInicio.hora * 60 + Clases[i].horaInicio.minuto;
      if (horaClase > horaActualLocal) {
        proximaClaseIndex = i;
        break;
      }
    }

    setProximaClase(proximaClaseIndex);
  }, [horaActual]);

  const calcularTiempoRestante = (clase) => {
    const horaInicio = new Date();
    horaInicio.setHours(clase.horaInicio.hora);
    horaInicio.setMinutes(clase.horaInicio.minuto);

    const diffEnMinutos = (horaInicio.getTime() - horaActual.getTime()) / (1000 * 60);
    const faltanMinutos = diffEnMinutos > 0 ? diffEnMinutos : diffEnMinutos + (24 * 60);
    return faltanMinutos;
  };

  return (
    <div>
      <h2>Hora Actual: {horaActual.toLocaleTimeString()}</h2>
      {proximaClase !== null ? (
        <div>
          <h2>Próxima clase: {Clases[proximaClase].nombre}</h2>
          <p>Tiempo restante: {calcularTiempoRestante(Clases[proximaClase])} minutos</p>
        </div>
      ) : (
        <p>No hay más clases programadas para hoy.</p>
      )}
    </div>
  );
};

export default TiempoParaClases;
