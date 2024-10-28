'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Row, Col,ListGroup, Alert, Modal } from 'react-bootstrap';
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
    <Container>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Panel de Administración</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">{isEditing ? 'Editar Profesor' : 'Agregar Profesor'}</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingrese el nombre" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Ingrese el apellido" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={form.dni} onChange={handleChange} placeholder="Ingrese el DNI" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ingrese el teléfono" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Ingrese el correo" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Ingrese la contraseña" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">{isEditing ? 'Actualizar Profesor' : 'Agregar Profesor'}</Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={8} className="mx-auto">
          <h2 className="text-center">Listado de Profesores</h2>
          <ListGroup variant="flush">
            {profesores.map((profesor) => (
              <ListGroup.Item key={profesor.ProfesorID} className="d-flex justify-content-between align-items-center">
                <div>
                  {profesor.nombre} {profesor.apellido} - {profesor.correo}
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(profesor.ProfesorID)}>Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(profesor.ProfesorID)}>Eliminar</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CrudProfesores;
