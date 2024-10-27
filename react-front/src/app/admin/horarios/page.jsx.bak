'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AdminPage from '../page';

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

  /*
   listadoMaterias = dashboard.obtenerMaterias();
   listadoProfesores = dashboard.obtenerProfesores();
   listadoCursos = dashboard.listarCursos();
   
  */

  const apiUrlHorarios = 'https://backend-asistencia-qr.vercel.app/api/insertar/horarios'; // URL de la API para los horarios
  const apiUrlProfesores = 'https://backend-asistencia-qr.vercel.app/api/profesores';
  const apiUrlMaterias = 'https://backend-asistencia-qr.vercel.app/api/listado/materias';
  const apiUrlCursos = 'https://backend-asistencia-qr.vercel.app/api/listado/cursos';
  // Obtener todos los horarios del backend cuando el componente se monta
  useEffect(() => {
    fetch(apiUrlHorarios)
      .then((response) => response.json())
      .then((data) => setHorarios(data))
      .catch((error) => console.error('Error al obtener horarios:', error));

    fetch(apiUrlProfesores)
      .then((response) => response.json())
      .then((data) => setProfesores(data))
      .catch((error) => console.error('Error al obtener Profesores:', error));

    fetch(apiUrlMaterias)
      .then((response) => response.json())
      .then((data) => setMaterias(data))
      .catch((error) => console.error('Error al obtener Materias:', error));

    fetch(apiUrlCursos)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(curso => {
          console.log(`Anio: ${curso.Anio}, Division: ${curso.Division}`);
        });
        setCursos(data);
      })
      .catch((error) => console.error('Error al obtener Cursos:', error));

  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar el formulario (agregar o editar horario)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      CursoID: cursos.find((curso) => curso.Anio === anio && curso.division === division)?.CursoID
    }

    if (isEditing) {
      // Actualizar un horario existente
      fetch(`${apiUrlHorarios}/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de horarios en el frontend
          setHorarios((prev) =>
            prev.map((horario) => (horario.HorarioID === currentId ? data : horario))
          );
          setIsEditing(false);
          setCurrentId(null);
        })
        .catch((error) => console.error('Error al actualizar horario:', error));
    } else {
      // Agregar un nuevo horario
      fetch(apiUrlHorarios, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setHorarios([...horarios, data]);
        })
        .catch((error) => console.error('Error al agregar horario:', error));
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
    setDivision('')
  };

  // Función para eliminar un horario
  const handleDelete = (id) => {
    fetch(`${apiUrlHorarios}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar la lista de horarios en el frontend
        setHorarios(horarios.filter((horario) => horario.HorarioID !== id));
      })
      .catch((error) => console.error('Error al eliminar horario:', error));
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
                <Nav.Link><img src="
                
                "  alt='App Icon' height={100} /></Nav.Link>
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
                            <AdminPage></AdminPage>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
      <h1 className="my-4">Gestión de Horarios</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Profesor ID</label>
            <select

              name="ProfesorID"
              className="form-control"
              value={form.ProfesorID}
              onChange={(e) => setProfesores(e.target.value)}
              required
            >
              <option value=''>Selecciona Un Profesor</option>
              {profesores.map((profesor) => (
                <option key={profesor.ProfesorID} value={profesor.ProfesorID}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Materia</label>
            <select

              name="MateriaID"
              className="form-control"
              value={form.MateriaID}
              onChange={(e) => setMaterias(e.target.value)}
              required
            >
              <option value="">Selecciona Una Materia</option>
              {materias.map((materia) => (
                <option key={materias.MateriaID} value={materia.MateriaID}>
                  {materia.NombreMateria}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Año</label>
            <select

              name="Anio"
              className="form-control"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              required
            >
              <option value="">Selecciona un año</option>
              {cursos.length > 0 ? (
                cursos.map((curso) => (
                  <option key={`${curso.Anio} - ${curso.Division}`} value={`${curso.Anio} - ${curso.Division}`}>
                    {`${curso.Anio} - ${curso.Division}`}
                  </option>
                ))
              ) : (
                <option value=''>No hay años disponibles</option>
              )}




            </select>
          </div>



          <div className="col-md-6">
            <label>Division</label>
            <select
              name="Division"
              className="form-control"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              required
            >
              <option value="">Selecciona una Division</option>
              {[...new Set(cursos.map((curso) => curso.division))].map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Día</label>
            <select
              name="Dia"
              className="form-control"
              value={form.Dia}
              onChange={handleChange}
              required
            >
              <option value="">Seleciona Un Dia</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miercoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Hora Inicio de la clase</label>
            <input
              type="time"
              name="horaInicio"
              className="form-control"
              value={form.horaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Hora Final de la clase</label>
            <input
              type="time"
              name="horaFinal"
              className="form-control"
              value={form.horaFinal}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Horario' : 'Agregar Horario'}
        </button>
      </form>

      {/* Lista de Horarios */}
      <h2 className="my-4">Lista de Horarios</h2>
      {horarios.length === 0 ? (
        <p>No hay horarios registrados.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Profesor ID</th>
              <th>Curso ID</th>
              <th>Materia ID</th>
              <th>Día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.HorarioID}>
                <td>{horario.ProfesorID}</td>
                <td>{horario.CursoID}</td>
                <td>{anio}</td>
                <td>{division}</td>
                <td>{horario.MateriaID}</td>
                <td>{horario.Dia}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(horario.HorarioID)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(horario.HorarioID)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudHorarios;
