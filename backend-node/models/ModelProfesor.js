//ModelProfesor

//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

export const TablaProfesor = db.define('profesores',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
      },
      apellido: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      correo: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      }
    }, {
      // Otras configuraciones del modelo
       // Deshabilitar las columnas 'createdAt' y 'updatedAt'
      timestamps: false
    });























