//ModelAsistencia
//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

export const TablaAsistencia = db.define('asistencias', {
  AsistenciaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true // Si la base de datos acepta valores nulos para esta columna
  },
  HoraLlegada: {
    type: DataTypes.TIME,
    allowNull: true
  },
  ProfesorID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'profesores', // Este es el nombre de la tabla de profesores
      key: 'id' // La columna de la tabla profesores que es la clave foránea
    }
  }
}, {
  timestamps: false, // Deshabilitar las columnas 'createdAt' y 'updatedAt'
});


export default TablaAsistencia;