//ModelCursos
//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'cursos'
export const TablaCurso = db.define('cursos', {
    CursoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Division: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    timestamps: false
  });
  
export default TablaCurso;