'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import AdminPage from '../page';

const CrudProfesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    correo: '',
    password: '', 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const apiUrl = 'https://backend-asistencia-qr.vercel.app/api/profesores'; // URL de la API

  // Obtener todos los profesores del backend cuando el componente se monta
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setProfesores(data);
      } catch (error) {
        console.error('Error al obtener profesores:', error);
      }
    };

    fetchProfesores();
  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validación básica de formulario
  const validateForm = () => {
    const { nombre, apellido, dni, telefono, correo, password } = form;
    if (!nombre || !apellido || !dni || !telefono || !correo || (!isEditing && !password)) {
      alert('Por favor, completa todos los campos');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(correo)) {
      alert('Correo electrónico no válido');
      return false;
    }
    if (!/^\d+$/.test(dni)) {
      alert('DNI debe ser un número válido');
      return false;
    }
    return true;
  };

  // Enviar el formulario (agregar o editar profesor)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formulario antes de enviar', form);
    if (!validateForm()) return;

    try {
      const options = {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      };

      const response = await fetch(isEditing ? `${apiUrl}/${currentId}` : apiUrl, options);
      const data = await response.json();

      if (isEditing) {
        // Actualizar profesor existente
        setProfesores((prev) =>
          prev.map((profesor) => (profesor.id === currentId ? data : profesor))
        );
        setIsEditing(false);
        setCurrentId(null);
      } else {
        // Agregar nuevo profesor
        setProfesores((prev) => [...prev, data]);
      }

      // Limpiar formulario
      setForm({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        correo: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al guardar profesor:', error);
    }
  };

  // Función para eliminar un profesor
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este profesor?')) return;

    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      setProfesores((prev) => prev.filter((profesor) => profesor.id !== id));
    } catch (error) {
      console.error('Error al eliminar profesor:', error);
    }
  };

  // Función para editar un profesor
  const handleEdit = (id) => {
    const profesorToEdit = profesores.find((profesor) => profesor.id === id);
    if (profesorToEdit) {
      console.log('editando el profesor', profesorToEdit);
      setForm({
        nombre: profesorToEdit.nombre || '',
        apellido: profesorToEdit.apellido || '',
        dni: profesorToEdit.dni || '',
        telefono: profesorToEdit.telefono || '',
        correo: profesorToEdit.correo || '',
        password: '', // Solo si es necesario
      });
      setCurrentId(id);
      setIsEditing(true);
    } else {
      console.error('No se encontró el profesor para editar', id);
    }
  };

  return (
    <div className="container">
      <Navbar bg="dark" data-bs-theme="dark">
                <Nav.Link><img src="appicon.png"  alt='App Icon' height={100} /></Nav.Link>
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
      <h1 className="my-4">Gestión de Profesores</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>DNI</label>
            <input
              type="text"
              name="dni"
              className="form-control"
              value={form.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required={!isEditing} // Solo requerimos contraseña cuando estamos agregando un profesor
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Profesor' : 'Agregar Profesor'}
        </button>
      </form>

      {/* Lista de Profesores */}
      <h2 className="my-4">Lista de Profesores</h2>
      {profesores.length === 0 ? (
        <p>No hay profesores registrados.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((profesor) => (
              <tr key={profesor.id}>
                <td>{profesor.nombre}</td>
                <td>{profesor.apellido}</td>
                <td>{profesor.dni}</td>
                <td>{profesor.telefono}</td>
                <td>{profesor.correo}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(profesor.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(profesor.id)}
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

export default CrudProfesores;
