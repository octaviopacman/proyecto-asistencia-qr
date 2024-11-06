'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const CrudMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    NombreMateria: '',
    Horario: '',
  });

  const apiUrl = 'https://backend-asistencia-qr.vercel.app/api/materias'; // URL de la API para las materias

  // Obtener todas las materias del backend cuando el componente se monta
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMaterias(data))
      .catch((error) => console.error('Error al obtener materias:', error));
  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar el formulario (agregar materia)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        setMaterias([...materias, data]);
      })
      .catch((error) => console.error('Error al agregar materia:', error));

    // Limpiar formulario
    setForm({
      NombreMateria: '',
      Horario: '',
    });
  };

  // Función para eliminar una materia
  const handleDelete = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMaterias(materias.filter((materia) => materia.MateriaID !== id));
      })
      .catch((error) => console.error('Error al eliminar materia:', error));
  };

  return (
    <div className="container">
      <Navbar bg="dark" data-bs-theme="dark">
        <Nav.Link><img src=".." alt='App Icon' height={100} /></Nav.Link>
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
              {/* Inserta componente de administración si es necesario */}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      <h1 className="my-4">Gestión de Materias</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nombre de la Materia</label>
            <input
              type="text"
              name="NombreMateria"
              className="form-control"
              value={form.NombreMateria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Horario</label>
            <input
              type="text"
              name="Horario"
              className="form-control"
              value={form.Horario}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Materia
        </button>
      </form>

      {/* Lista de Materias */}
      <h2 className="my-4">Lista de Materias</h2>
      {materias.length === 0 ? (
        <p>No hay materias registradas.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Horario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.MateriaID}>
                <td>{materia.NombreMateria}</td>
                <td>{materia.Horario}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(materia.MateriaID)}
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

export default CrudMaterias;
