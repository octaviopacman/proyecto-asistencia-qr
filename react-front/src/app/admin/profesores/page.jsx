'use client'
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Row, Col, ListGroup, Alert, FormControl } from 'react-bootstrap';
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
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (!panelAdmin) return;
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
  console.log('datos recibidos de profesores', profesores)
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { nombre, apellido, dni, telefono, correo, password } = form;
    const newErrors = [];

    if (!nombre) newErrors.push('El nombre es requerido.');
    if (!apellido) newErrors.push('El apellido es requerido.');
    if (!dni) newErrors.push('El DNI es requerido.');
    if (!telefono) newErrors.push('El teléfono es requerido.');
    if (!correo) newErrors.push('El correo es requerido.');
    if (!isEditing && !password) newErrors.push('La contraseña es requerida.');
    if (correo && !/\S+@\S+\.\S+/.test(correo)) newErrors.push('Correo electrónico no válido.');
    if (dni && !/^\d+$/.test(dni)) newErrors.push('DNI debe ser un número válido.');

     if (newErrors.length > 0) {
      setErrors(newErrors); // Actualiza el estado de errores
      return false;
    }

    setErrors([]); // Limpia errores si todo es válido
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = { ...form };
    if (isEditing) {
      const data = await panelAdmin.updateProfesor(currentId, dataToSend);
      setProfesores((prev) => prev.map((profesor) => (profesor.id === currentId ? data : profesor)));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const data = await panelAdmin.createProfesor(dataToSend);
      setProfesores((prev) => [...prev, data]);
    }

    setForm({ nombre: '', apellido: '', dni: '', telefono: '', correo: '', password: '' });
  };

  const handleDelete = async (id) => {
    console.log('id a eliminar', id)
    if (!window.confirm('¿Estás seguro de eliminar este profesor?')) return;

    try {
      await panelAdmin.deleteProfesor(id);
      setProfesores((prev) => prev.filter((profesor) => profesor.ProfesorID !== id));
    } catch (error) {
      console.error('Error al eliminar profesor:', error);
    }
  };

  const handleEdit = (id) => {
    const numericId = Number(id); 
    console.log('editando el profesor', numericId)
    const profesorToEdit = profesores.find((profesor) => Number(profesor.id) === numericId);
    console.log('profesor to edit', profesorToEdit)
    if (profesorToEdit) {
      setForm({
        nombre: profesorToEdit.nombre || '',
        apellido: profesorToEdit.apellido || '',
        dni: profesorToEdit.dni || '',
        telefono: profesorToEdit.telefono || '',
        correo: profesorToEdit.correo || '',
        password: '',
      });
      setCurrentId(numericId);
      setIsEditing(true);
    } else {
      console.error('No se encontró el profesor para editar', numericId);
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
        <Col md={12} className="mb-4">
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="d-flex flex-wrap gap-3">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="apellido" value={form.apellido} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDNI">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={form.dni} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="telefono" value={form.telefono} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={form.correo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              { isEditing ?(
              <FormControl type='text' value='********' readOnly/>
              ) : (
                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} />
            )}
            </Form.Group>
            <Button variant="primary" type="submit" className="align-self-end mt-2">
              {isEditing ? 'Actualizar' : 'Agregar'} Profesor
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={10} className="mx-auto">
          <h4 className="text-center">Listado de Profesores</h4>
          <ListGroup className="mt-3">
            {profesores.map((profesor) => (
              <ListGroup.Item key={profesor.ProfesorID} className="d-flex justify-content-between align-items-center">
                <span>{profesor.nombre} {profesor.apellido} - {profesor.correo}</span>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(profesor.id)}>Editar</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(profesor.id)}>Eliminar</Button>
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
