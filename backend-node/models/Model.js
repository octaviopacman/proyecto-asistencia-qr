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
  HoraSalida: {
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

// Modelo para la tabla 'horarios'
export const TablaHorario = db.define('horarios', {
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

// Modelo para la tabla 'materias'
export const TablaMateria = db.define('materias', {
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






















