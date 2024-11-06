'use client';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { Admin } from '../../assets/conexiones';
import { useSession } from '../../assets/session';

const CrudMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    nombremateria: '',
    Horario: '',
  });
  const [errors, setErrors] = useState([]);
  const { user } = useSession();
  const panelAdmin = user ? new Admin(user.token) : null;

  // Obtener todas las materias del backend cuando el componente se monta
  useEffect(() => {
    if (!panelAdmin) return;
    const fetchMaterias = async () => {
      try {
        const datos = await panelAdmin.ListadoMaterias();
        setMaterias(datos);
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    };
    fetchMaterias();
  }, [panelAdmin]);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validación del formulario
  const validateForm = () => {
    const { nombremateria, Horario } = form;
    const newErrors = [];
    if (!nombremateria) newErrors.push('El nombre de la materia es requerido.');
    if (!Horario) newErrors.push('El horario es requerido.');
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors([]);
    return true;
  };

  // Enviar el formulario (agregar materia)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = await panelAdmin.insertarMateria(form);
      setMaterias((prev) => [...prev, data]);
      setForm({ nombremateria: '', Horario: '' });
    } catch (error) {
      console.error('Error al agregar materia:', error);
    }
  };

  // Función para eliminar una materia
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta materia?')) return;

    try {
      await panelAdmin.eliminarMateria(id);
      setMaterias((prev) => prev.filter((materia) => materia.materiaid !== id));
    } catch (error) {
      console.error('Error al eliminar materia:', error);
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
            <Form.Group controlId="formnombremateria">
              <Form.Label>Nombre de la Materia</Form.Label>
              <Form.Control
                type="text"
                name="nombremateria"
                value={form.nombremateria}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formHorario">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                type="text"
                name="Horario"
                value={form.Horario}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="align-self-end mt-2">
              Agregar Materia
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={10} className="mx-auto">
          <h4 className="text-center">Listado de Materias</h4>
          <ListGroup className="mt-3">
            {materias.map((materia) => (
              <ListGroup.Item key={materia.materiaid} className="d-flex justify-content-between align-items-center">
                <span>{materia.nombremateria} - {materia.Horario}</span>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(materia.materiaid)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CrudMaterias;
