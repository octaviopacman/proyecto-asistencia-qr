"use client"
import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Card, Col, Row, Button, Dropdown } from 'react-bootstrap';
import QRCodeComponent from '../login/codigo';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';
import { useRouter } from 'next/navigation';
import { Dashboard } from '../assets/conexiones';
import { useSession } from "../assets/session";
import AdminPage from "../admin/page";
import LoadingSpinner from '../components/loadingSpinner';


function Admin() {
    const {user,login,logout} = useSession();
    const [data, setData] = useState({
        asistencias: { asistencias: 0, inasistencias: 0 },
        horarioProfesor: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Verifica que el token esté disponible
    
    const dashboard = new Dashboard(user.token);
    
    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const asistencias = await dashboard.contarAsistencias();
                const horarioProfesor = await dashboard.mostrarHorarioProfesor();

                const resultados = {
                    asistencias: asistencias || { asistencias: 0, inasistencias: 0 },
                    horarioProfesor: horarioProfesor || []
                };

                setData(resultados);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error("Error 403: Acceso denegado");
                    setError("No tienes permiso para acceder a estos datos. Redirigiendo a inicio de sesión...");
                    router.push("/login");
                } else {
                    console.error("Error al obtener los datos del dashboard:", error);
                    setError("Hubo un problema al cargar los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dashboard, router]);

    if (!user || !user.token) {
        router.push("/login");
        return null;
    }
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const logOut = () => {
        console.log("Cierre de sesión...");
        logout();
        router.push("/login");
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand href="/dashboard">
                        <img src="appicon.png" className={styles.icono} alt="App Icon" height={40} /> Menú de Asistencias
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard/asistencias">Asistencias</Nav.Link>
                        <Nav.Link href="/dashboard/materias">Materias</Nav.Link>
                        <Nav.Link href="/dashboard/preceptores">Preceptores</Nav.Link>
                    </Nav>
                    
                    
                    <Nav>
                        <Button variant='danger' onClick={() => logOut()}>Cerrar Sesion</Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className={styles.tarjetas}>
                <Row>
                    <Col md={8} className="mb-4">
                        <Card className={`${styles.tarjeta} ${styles['tarjeta-asistencias']}`}>
                            <Card.Body>
                                <Card.Title>Asistencias</Card.Title>
                                {data.asistencias ? (
                                    <DonutChart
                                        attendance={data.asistencias.asistencias}
                                        absence={data.asistencias.inasistencias + 1}
                                        width={150}
                                        height={150}
                                        className={styles['donut-chart']}
                                    />
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
                                <Button href="/dashboard/materias" variant="primary">Ver más</Button>
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
                                        <div key={curso.cursoid}>
                                            <Card.Text>
                                                <strong>Curso:</strong> {curso.cursoid} <br />
                                                <strong>Día:</strong> {curso.dia} <br />
                                                <strong>Hora:</strong> {curso.horainicio} - {curso.horafinal}
                                            </Card.Text>
                                            <hr />
                                        </div>
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
