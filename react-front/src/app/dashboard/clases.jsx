import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

interface Clase {
  nombre: string;
  horaInicio: {
    hora: number;
    minuto: number;
  };
}

const Clases: Clase[] = [
  { nombre: 'Matemáticas', horaInicio: { hora: 7, minuto: 30 } },
  { nombre: 'Lengua', horaInicio: { hora: 11, minuto: 30 } },
  { nombre: 'Filosofía', horaInicio: { hora: 15, minuto: 0 } }
];

const TiempoParaClases: React.FC = () => {
  const [horaActual, setHoraActual] = useState<Date>(new Date());
  const [proximaClase, setProximaClase] = useState<number | null>(null);
  const [tiempoRestante, setTiempoRestante] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000); // Actualiza la hora cada segundo

    return () => clearInterval(interval);
  }, []); // Se ejecuta solo una vez al cargar el componente

  useEffect(() => {
    // Encuentra la próxima clase
    const horaActualLocal = horaActual.getHours() * 60 + horaActual.getMinutes();
    let proximaClaseIndex: number | null = null;

    for (let i = 0; i < Clases.length; i++) {
      const horaClase = Clases[i].horaInicio.hora * 60 + Clases[i].horaInicio.minuto;
      if (horaClase > horaActualLocal) {
        proximaClaseIndex = i;
        break;
      }
    }

    setProximaClase(proximaClaseIndex);

    if (proximaClaseIndex !== null) {
      const clase = Clases[proximaClaseIndex];
      const horaInicio = new Date();
      horaInicio.setHours(clase.horaInicio.hora);
      horaInicio.setMinutes(clase.horaInicio.minuto);

      const diffEnSegundos = Math.round((horaInicio.getTime() - horaActual.getTime()) / 1000);
      const horas = Math.floor(diffEnSegundos / 3600);
      const minutos = Math.floor((diffEnSegundos % 3600) / 60);

      setTiempoRestante(`${horas}h ${minutos}m`);
    } else {
      setTiempoRestante('No hay más clases programadas para hoy.');
    }
  }, [horaActual]);

  return (
    <Card style={{ width: '18rem' }} className='tarjeta'>
      <Card.Body>
        <Card.Title>Próxima Clase</Card.Title>
        {proximaClase !== null && (
          <div>
            <Card.Text>Clase: {Clases[proximaClase].nombre}</Card.Text>
            <Card.Text>Tiempo restante: {tiempoRestante}</Card.Text>
          </div>
        )}
        {proximaClase === null && (
          <Card.Text>{tiempoRestante}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default TiempoParaClases;
