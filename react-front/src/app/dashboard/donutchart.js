import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registro de los componentes necesarios
Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ attendance, absence }) => {
  const data = {
    labels: ['Asistencias', 'Inasistencias'],
    datasets: [
      {
        data: [attendance, absence],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  

  return <Doughnut style={{width: '250'}} data={data} />;
};

export default DonutChart;
