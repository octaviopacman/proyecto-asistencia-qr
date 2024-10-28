'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import AdminPage from '../page';
import { Admin } from '../../assets/conexiones';
import { useSession } from '../../assets/session';

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
  const { user } = useSession();
  const panelAdmin = user ? new Admin(user.token) : null;

  // Obtener todos los profesores cuando el componente se monta
  useEffect(() => {
    if(!panelAdmin) return
    const fetchProfesores = async () => {
      try {
        const datos = await panelAdmin.getAllProfesores();
        setProfesores(datos);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchProfesores();
  }, [panelAdmin]);

  // Manejador de cambio en el formulario
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
  if (!validateForm()) return;

  const dataToSend = {
    nombre: form.nombre,
    apellido: form.apellido,
    dni: form.dni,
    telefono: form.telefono,
    correo: form.correo,
    password: form.password,
  };

  console.log('Enviando datos al backend:', dataToSend);

  try {
    if (isEditing) {
      delete dataToSend.password; // Omitimos `password` si estamos editando
      const data = await panelAdmin.updateProfesor(currentId, dataToSend);
      setProfesores((prev) =>
        prev.map((profesor) => (profesor.ProfesorID === currentId ? data : profesor))
      );
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const data = await panelAdmin.createProfesor(dataToSend);
      setProfesores((prev) => [...prev, data]);
    }

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



  // Eliminar profesor
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este profesor?')) return;

    try {
      await panelAdmin.deleteProfesor(id);
      setProfesores((prev) => prev.filter((profesor) => profesor.id !== id));
    } catch (error) {
      console.error('Error al eliminar profesor:', error);
    }
  };

  // Editar profesor
  const handleEdit = (id) => {
    const profesorToEdit = profesores.find((profesor) => profesor.id === id);
    if (profesorToEdit) {
      setForm({
        nombre: profesorToEdit.nombre || '',
        apellido: profesorToEdit.apellido || '',
        dni: profesorToEdit.dni || '',
        telefono: profesorToEdit.telefono || '',
        correo: profesorToEdit.correo || '',
        password: '',
      });
      setCurrentId(id);
      setIsEditing(true);
    } else {
      console.error('No se encontró el profesor para editar', id);
    }
  };

  return (
    <div className="container">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Panel de Administración</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
        </Nav>
      </Navbar>

      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
        <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} />
        <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'} Profesor</button>
      </form>

      <ul>
  {profesores.map((profesor) => (
    <li key={profesor.ProfesorID}>
      {profesor.nombre} {profesor.apellido} - {profesor.correo}
      <button onClick={() => handleEdit(profesor.ProfesorID)}>Editar</button>
      <button onClick={() => handleDelete(profesor.ProfesorID)}>Eliminar</button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default CrudProfesores;
