'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AdminPage from '../page';
import { useSession } from '@/app/assets/session';
import {Admin} from '../../assets/conexiones'; // Importa la clase Admin (ajusta la ruta según corresponda)

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
    CursoID: '',
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
  
 /* ESTO ES UN QUILOMBO */

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        // Actualizar un horario existente
        const updatedHorario = await admin.actualizarHorario(currentId, formData);
        setHorarios((prev) => prev.map((horario) => (horario.HorarioID === currentId ? updatedHorario : horario)));
        setIsEditing(false);
        setCurrentId(null);
      } else {
        // Agregar un nuevo horario
        const newHorario = await admin.insertarHorario(formData);
        setHorarios([...horarios, newHorario]);
      }
      // Limpiar formulario
      setForm({
        ProfesorID: '',
        CursoID: '',
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
    setForm(horarioToEdit);
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
<div className="mb-4">
  <label>Profesor</label>
  <select name="ProfesorID" onChange={handleChange} value={form.ProfesorID}>
    {profesores.map((profesor) => (
      <option key={profesor.ProfesorID} value={profesor.ProfesorID}>
        {profesor.Nombre}
      </option>
    ))}
  </select>
</div>
// Repetir estructura similar para Materias, Cursos, Días y Horarios

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
