'use client';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown, Form, Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import AdminPage from '../page';
import { useSession } from '@/app/assets/session';
import { Admin } from '../../assets/conexiones';

const SelectField = ({ label, name, value, options, onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as="select"
      name={name}
      value={value}
      onChange={(e) => onChange({ target: { name, value: e.target.value } })}
      required
    >
      <option value="">Seleccione {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.id} {/* Se muestra el nombre, pero el valor es el ID */}
        </option>
      ))}
    </Form.Control>

  </Form.Group>
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
    fechainicio: '',
    fechafin: toString('') + ":00",
  });
  const [errors, setErrors] = useState([]);
  const admin = new Admin(user.token);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [horariosData, profesoresData, materiasData, cursosData] = await Promise.all([
          admin.mostrarTodosLosHorarios(),
          admin.getAllProfesores(),
          admin.ListadoMaterias(),
          admin.ListadoCursos(),
        ]);

        setHorarios(horariosData);
        setProfesores(profesoresData);
        setMaterias(materiasData);
        setCursos(cursosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchDatos();
  }, [admin]);

  

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    /* console.log('Año seleccionado:', anio);
    console.log('División seleccionada:', division);
    console.log('Lista de cursos:', cursos); */
    e.preventDefault();

    const curso = cursos.find(
      (curso) => String(curso.anio) === String(anio) && String(curso.division) === String(division)
    );

    if (!curso) {
      setErrors(["El curso seleccionado no es válido. Por favor, elige un año y división correctos."]);
      return;
    }

    const formData = {
      ...form,
      CursoID: curso.cursoid,
    };
    console.log("Datos del formulario: ", formData);

    try {
      const newHorario = await admin.insertarHorario(formData);
      setHorarios([...horarios, newHorario]);
      setForm({
        ProfesorID: '',
        MateriaID: '',
        Dia: '',
        fechainicio: '',
        fechafin: '',
      });
      setAnio('');
      setDivision('');
    } catch (error) {
      console.error('Error al agregar horario:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este horario?')) return;

    try {
      await admin.eliminarHorario(id);
      setHorarios(horarios.filter((horario) => horario.horarioid !== id));
    } catch (error) {
      console.error('Error al eliminar horario:', error);
    }
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Menú de Asistencias</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/asistencias">Asistencias</Nav.Link>
            <Nav.Link href="/dashboard/materias">Materias</Nav.Link>
            <Nav.Link href="/dashboard/preceptores">Preceptores</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown drop="start">
              <Dropdown.Toggle>Administración</Dropdown.Toggle>
              <Dropdown.Menu>
                <AdminPage />
              </Dropdown.Menu>
            </Dropdown>
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

            <SelectField
              label="Profesor"
              name="ProfesorID"
              value={form.ProfesorID}
              options={profesores.map((p) => ({
                id: p.nombre,
                label: `${p.nombre} ${p.apellido}`,
              }))}
              onChange={handleChange}
            />
            <SelectField
              label="Materia"
              name="MateriaID"
              value={form.MateriaID}
              options={materias.map((m) => ({
                id: m.nombremateria,
                label: m.nombremateria,
              }))}
              onChange={handleChange}
            />
            <Form.Group controlId="formAnio">
              <Form.Label>Año</Form.Label>
              <Form.Control as="select" value={anio} onChange={(e) => setAnio(e.target.value)} required>
                <option value="">Seleccione Año</option>
                {[...new Set(cursos.map((curso) => curso.anio))].map((anio) => (
                  <option key={anio} value={anio}>{anio}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDivision">
              <Form.Label>División</Form.Label>
              <Form.Control as="select" value={division} onChange={(e) => setDivision(e.target.value)} required>
                <option value="">Seleccione División</option>
                {[...new Set(cursos.map((curso) => curso.division))].map((division) => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDia">
              <Form.Label>Día</Form.Label>
              <Form.Control type="text" name="Dia" value={form.Dia} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formHoraInicio">
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control 
               name="fechainicio"
               value={form.fechainicio}
               type='time' 
               onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formHoraFinal">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control
                type="time"
                name="fechafin"
                value={form.fechafin}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="align-self-end mt-2">Agregar Horario</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={10} className="mx-auto">
          <h4 className="text-center">Listado de Horarios</h4>
          <ListGroup className="mt-3">
            {horarios.map((horario) => (
              <ListGroup.Item key={horario.horarioid} className="d-flex justify-content-between align-items-center">
                <span>
                  {`${profesores.find((p) => parseInt(p.id) === parseInt(horario.profesorid))?.nombre} - 
                  ${materias.find((m) => parseInt(m.materiaid) === parseInt(horario.materiaid))?.nombremateria} - 
                  ${cursos.find((c) => parseInt(c.cursoid) === parseInt(horario.cursoid))?.anio || ''} ${cursos.find((c) => parseInt(c.cursoid) === parseInt(horario.cursoid))?.division || ''} - 
                  Día: ${String(horario.dia)} - Hora Inicio: ${String(horario.fechainicio)} - Hora Final: ${String(horario.fechafin)}`}
                </span>
                <div>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(horario.horarioid)}>Eliminar</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CrudHorarios;
