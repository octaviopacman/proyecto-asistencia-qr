//ModelMateria
//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'materias'
const TablaMateria = db.define('materias', {
    MateriaID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NombreMateria: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: false
  });
  
export default TablaMateria;