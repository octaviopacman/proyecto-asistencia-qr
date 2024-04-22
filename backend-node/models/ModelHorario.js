///ModelHorario
//importamos la conexion a la DB
import db from "../database/db.js";
//iimportamos sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'horarios'
const TablaHorario = db.define('horarios', {
    HorarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Dia: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Horario: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    CursoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'CursoID'
      }
    },
    ProfesorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesores',
        key: 'id'
      }
    },
    MateriaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materias',
        key: 'MateriaID'
      }
    }
  }, {
    timestamps: false
  });
  
export default TablaHorario;