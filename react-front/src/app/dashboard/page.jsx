import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Card, Col, Row, Button, Dropdown, Alert } from 'react-bootstrap';
import QRCodeComponent from '../login/codigo';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';
import { useRouter } from 'next/navigation';
import { Dashboard } from '../assets/conexiones';
import { useSession } from "../assets/session";
import AdminPage from "../admin/page";

function Admin() {
    const [data, setData] = useState({
        asistencias: { asistencias: 0, inasistencias: 0 },
        horarioProfesor: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSession();
    const Router = useRouter();

    const dashboard = new Dashboard(user.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const asistencias = await dashboard.contarAsistencias();
                const horarioProfesor = await dashboard.mostrarHorarioProfesor();

                const resultados = {
                    asistencias: asistencias || {},
                    horarioProfesor: horarioProfesor || []
                };

                setData(resultados);
            } catch (error) {
                console.error("Error al obtener los datos del dashboard:", error);
                setError("Hubo un problema al cargar los datos.");
            }
        };

        fetchData();
    }, []);

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
                        <Dropdown.Toggle>Administración</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <AdminPage />
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>

            <Container className={styles.tarjetas}>
                <Row>
                    <Col md={8} className="mb-4">
                        <Card className={`${styles.tarjeta} ${styles['tarjeta-asistencias']}`}>
                            <Card.Body>
                                <Card.Title>Asistencias</Card.Title>
                                {data.asistencias ? (
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
                                <Card.Text>No tienes Materias designadas</Card.Text>
                                <Button href='/dashboard/materias'>Ver más</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} className="mb-4">
                        <Card className={styles.tarjeta}>
                            <Card.Body>
                                <Card.Title>Horario de Clases</Card.Title>
                                {data.horarioProfesor.length > 0 ? (
                                    data.horarioProfesor.map((curso) => (
                                        <Card.Text key={curso.cursoid}>
                                            <strong>Curso:</strong> {curso.cursoid} <br />
                                            <strong>Día:</strong> {curso.dia} <br />
                                            <strong>Hora:</strong> {curso.horainicio} - {curso.horafinal}
                                        </Card.Text>
                                    ))
                                ) : (
                                    <Card.Text>No tienes clases pendientes.</Card.Text>
                                )}
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
    );
}

export default Admin;
