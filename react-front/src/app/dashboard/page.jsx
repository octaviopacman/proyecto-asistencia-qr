'use client';
import { useState, useEffect } from 'react';
import {
    Nav,
    Navbar,
    Container,
    Card,
    Col,
    Row,
    Button,
} from 'react-bootstrap';
import QRCodeComponent from '../login/codigo';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';
import { useRouter } from 'next/navigation';
import { Dashboard } from '../assets/conexiones';
import { useSession } from "../assets/session";
import { Dropdown } from 'react-bootstrap';
import AdminPage from "../admin/page"

const URI_MATERIAS = 'https://backend-asistencia-qr.vercel.app/api/profesores/';
const URI_ASISTENCIAS = 'https://backend-asistencia-qr.vercel.app/api/login/contarasistencias/';
const URI_HORARIOS = 'https://backend-asistencia-qr.vercel.app/api/insertar/horarios';

function Admin() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, login, logout } = useSession();

    const Router = useRouter();

    console.log(user);
    console.log(user.token);




    const dashboard = new Dashboard(user.token);

    useEffect(() => {
        // Función asíncrona dentro de useEffect
        const fetchData = async () => {
            try {
                // Obtener todos los datos del dashboard
                const asistencias = await dashboard.contarAsistencias();
                const materias = await dashboard.obtenerMaterias();
                const horarioProfesor = await dashboard.mostrarHorarioProfesor();
                const horarioCurso = await dashboard.mostrarHorarioCurso();
                const cursos = await dashboard.listarCursos(); // Obtener los cursos
                const profesores = await dashboard.obtenerProfesores(); // Obtener los profesores
                //const horarios = await dashboard.insertarHorarios();

                // Combinar todos los datos en un solo objeto
                const resultados = {
                    asistencias,
                    materias,
                    horarioProfesor,
                    horarioCurso,
                    cursos,
                    profesores,
                    //horarios
                };

                // Establecer los datos combinados
                setData(resultados);
            } catch (error) {
                console.error("Error al obtener los datos del dashboard:", error);
                // Manejar el error según sea necesario
            }
        };

        fetchData();
    }, []);

    
    console.log(data);







    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Nav.Link><img src="appicon.png" className={styles.icono} alt='App Icon' height={100} /></Nav.Link>
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

            <div className={styles.tarjetas}>
                <Container>
                    <Row>
                        <Col md={8} className="mb-4">
                            <Card className={`${styles.tarjeta} ${styles['tarjeta-asistencias']}`}>
                                <Card.Body>
                                    <Card.Title>Asistencias</Card.Title>
                                    {data ? (
                                        <DonutChart attendance={data.asistencias.asistencias} absence={data.asistencias.inasistencias} width={150} height={150} className={styles['donut-chart']} />
                                    ) : (
                                        <Card.Text>No tienes asistencias registradas</Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className={styles.tarjeta}>
                                <Card.Body>
                                    <Card.Title>Materias</Card.Title>
                                    {data.materias.length > 0 ? (
                                        data.materias.map(materia => (
                                            <Card.Text key={materia.materiaid}>
                                                {materia.NombreMateria}
                                            </Card.Text>
                                        ))
                                    ) : (
                                        <Card.Text>No tienes Materias designadas</Card.Text>
                                    )}
                                    <Button href='/dashboard/materias'>Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className="mb-4">
                            <Card className={styles.tarjeta}>
                                <Card.Body>
                                    <Card.Title>Cursos</Card.Title>
                                    {data.horarios.length > 0 ? (
                                        data.cursos.map(curso => (
                                            <Card.Text key={curso.cursoid}>
                                                {curso.anio} -{curso.division}
                                            </Card.Text>
                                        ))
                                    ) : (
                                        <Card.Text>No tienes Clases Pendientes.</Card.Text>
                                    )}
                                    <Button href='/dashboard/materias'>Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4} className="mb-4">
                            <Card className={styles['tarjeta-QR']}>
                                <Card.Body>
                                    <Card.Title>Tu Código QR</Card.Title>
                                    <QRCodeComponent data={user.token} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Admin;
