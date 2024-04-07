//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

const ProfesorModel = db.define('profesores',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING,
      },
      Apellido: {
        type: DataTypes.STRING,
      },
      DNI: {
        type: DataTypes.STRING,
      },
      Telefono: {
        type: DataTypes.STRING,
      },
      Correo: {
        type: DataTypes.STRING,
      },
      Domicilio: {
        type: DataTypes.STRING,
      },
      ContrasenaHash: {
        type: DataTypes.STRING,
      }
    }, {
      // Otras configuraciones del modelo
       // Deshabilitar las columnas 'createdAt' y 'updatedAt'
      timestamps: false
    });

export default ProfesorModel;



















