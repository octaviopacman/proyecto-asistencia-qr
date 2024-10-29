'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AdminPage from '../page';
import { useSession } from '@/app/assets/session';
import { Admin } from '../../assets/conexiones'; // Ajusta la ruta si es necesario

// Componente auxiliar para campos de selección (select)
const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="mb-4">
    <label>{label}</label>
    <select name={name} onChange={onChange} value={value}>
      <option value="">Seleccione {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </select>
  </div>
);

const CrudHorarios = () => {
  const { user } = useSession();
  const [horarios, setHorarios] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [anio, setAnio] = useState('');
  const [division, setDivision] = useState('');
  const [form, setForm] = useState({
    ProfesorID: '',
    MateriaID: '',
    Dia: '',
    horaInicio: '',
    horaFinal: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Instanciar la clase Admin
  const admin = new Admin(user.token);

  // Obtener datos cuando el componente se monta
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [profesoresData, materiasData, cursosData] = await Promise.all([
          admin.obtenerProfesores(),
          admin.obtenerMaterias(),
          admin.obtenerCursos(),
        ]);
        setProfesores(profesoresData);
        setMaterias(materiasData);
        setCursos(cursosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchDatos();
  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCursoChange = (e, campo) => {
    if (campo === 'anio') setAnio(e.target.value);
    if (campo === 'division') setDivision(e.target.value);
  };

  // Enviar el formulario (agregar o editar horario)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...form,
      CursoID: cursos.find((curso) => curso.Anio === anio && curso.Division === division)?.CursoID,
    };

    try {
      if (isEditing) {
        const updatedHorario = await admin.actualizarHorario(currentId, formData);
        setHorarios((prev) => prev.map((horario) => (horario.HorarioID === currentId ? updatedHorario : horario)));
        setIsEditing(false);
        setCurrentId(null);
      } else {
        const newHorario = await admin.insertarHorario(formData);
        setHorarios([...horarios, newHorario]);
      }
      // Limpiar formulario
      setForm({
        ProfesorID: '',
        MateriaID: '',
        Dia: '',
        horaInicio: '',
        horaFinal: '',
      });
      setAnio('');
      setDivision('');
    } catch (error) {
      console.error('Error al manejar el formulario:', error);
    }
  };

  // Función para eliminar un horario
  const handleDelete = async (id) => {
    try {
      await admin.eliminarHorario(id);
      setHorarios(horarios.filter((horario) => horario.HorarioID !== id));
    } catch (error) {
      console.error('Error al eliminar horario:', error);
    }
  };

  // Función para editar un horario
  const handleEdit = (id) => {
    const horarioToEdit = horarios.find((horario) => horario.HorarioID === id);
    setForm({
      ProfesorID: horarioToEdit.ProfesorID,
      MateriaID: horarioToEdit.MateriaID,
      Dia: horarioToEdit.Dia,
      horaInicio: horarioToEdit.horaInicio,
      horaFinal: horarioToEdit.horaFinal,
    });
    setAnio(horarioToEdit.Anio);
    setDivision(horarioToEdit.Division);
    setCurrentId(id);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <Navbar bg="dark" data-bs-theme="dark">
        <Nav.Link>
          <img src="" alt='App Icon' height={100} />
        </Nav.Link>
        <Navbar.Brand href="/dashboard">Menú de Asistencias</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href='/dashboard/asistencias'>Asistencias</Nav.Link>
          <Nav.Link href="/dashboard/materias">Materias</Nav.Link>
          <Nav.Link href="/dashboard/preceptores">Preceptores</Nav.Link>
        </Nav>
        <Nav>
          <Dropdown drop='start'>
            <Dropdown.Toggle>
              Administración
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <AdminPage />
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      <h1 className="my-4">Gestión de Horarios</h1>

      {/* Formulario de Horarios */}
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Profesor"
          name="ProfesorID"
          value={form.ProfesorID}
          options={profesores.map((p) => ({ id: p.ProfesorID, nombre: p.Nombre }))}
          onChange={handleChange}
        />
        <SelectField
          label="Materia"
          name="MateriaID"
          value={form.MateriaID}
          options={materias.map((m) => ({ id: m.MateriaID, nombre: m.Nombre }))}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label>Año</label>
          <select value={anio} onChange={(e) => handleCursoChange(e, 'anio')}>
            {cursos.map((curso) => (
              <option key={curso.CursoID} value={curso.Anio}>{curso.Anio}</option>
            ))}
          </select>
          <label>División</label>
          <select value={division} onChange={(e) => handleCursoChange(e, 'division')}>
            {cursos.map((curso) => (
              <option key={curso.CursoID} value={curso.Division}>{curso.Division}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Día</label>
          <input type="text" name="Dia" value={form.Dia} onChange={handleChange} />
          <label>Hora Inicio</label>
          <input type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} />
          <label>Hora Final</label>
          <input type="time" name="horaFinal" value={form.horaFinal} onChange={handleChange} />
        </div>
        <button type="submit">{isEditing ? 'Actualizar Horario' : 'Agregar Horario'}</button>
      </form>

      {/* Tabla de Horarios */}
      <table className="table">
        <thead>
          <tr>
            <th>Profesor</th>
            <th>Materia</th>
            <th>Curso</th>
            <th>Día</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.HorarioID}>
              <td>{horario.ProfesorNombre}</td>
              <td>{horario.MateriaNombre}</td>
              <td>{`${horario.Anio} - ${horario.Division}`}</td>
              <td>{horario.Dia}</td>
              <td>{horario.horaInicio}</td>
              <td>{horario.horaFinal}</td>
              <td>
                <button onClick={() => handleEdit(horario.HorarioID)}>Editar</button>
                <button onClick={() => handleDelete(horario.HorarioID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudHorarios;
