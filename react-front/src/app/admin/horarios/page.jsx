'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AdminPage from '../page';
import Admin from '../path/to/admin'; // Importa la clase Admin (ajusta la ruta según corresponda)

const CrudHorarios = () => {
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
  const admin = new Admin();

  // Obtener datos cuando el componente se monta
  useEffect(() => {
    // Obtener Horarios, Profesores, Materias y Cursos desde Admin
    admin.obtenerHorarios()
      .then((data) => setHorarios(data))
      .catch((error) => console.error('Error al obtener horarios:', error));

    admin.obtenerProfesores()
      .then((data) => setProfesores(data))
      .catch((error) => console.error('Error al obtener Profesores:', error));

    admin.obtenerMaterias()
      .then((data) => setMaterias(data))
      .catch((error) => console.error('Error al obtener Materias:', error));

    admin.listarCursos()
      .then((data) => setCursos(data))
      .catch((error) => console.error('Error al obtener Cursos:', error));
  }, []);

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

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* ... Campos del formulario aquí ... */}
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Horario' : 'Agregar Horario'}
        </button>
      </form>

      {/* Lista de Horarios */}
      <h2 className="my-4">Lista de Horarios</h2>
      {/* ... Tabla de horarios aquí ... */}
    </div>
  );
};

export default CrudHorarios;
