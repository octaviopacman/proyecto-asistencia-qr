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
import {useSession} from "../assets/session";

const URI_MATERIAS = 'https://backend-asistencia-qr.vercel.app/api/profesores/';
const URI_ASISTENCIAS = 'https://backend-asistencia-qr.vercel.app/api/login/contarasistencias/';
const URI_HORARIOS = 'https://backend-asistencia-qr.vercel.app/api/insertar/horarios';

function Admin() {
    const [data, setData] = useState(null);
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [horarios, setHorarios] = useState([]);
    const [error, setError] = useState(null);
    const { user, login, logout } = useSession();

    const Router = useRouter();

    console.log(user);
    console.log(user.token);
    
    

    
    const dashboard = new Dashboard(user.token);
    (async () => {
        let resultado = await dashboard.contarAsistencias();
        setData(resultado);
    })();





    /*
        useEffect(() => {
            // Verificar si el token existe en las cookies
            const checkAuth = async () => {
                const response = await fetch('THIAGO HACE LA RUTA', {
                    method: 'GET',
                    credentials: 'include', // Incluir cookies en la solicitud
                });
    
                if (!response.ok) {
                    // Si el token no es válido o no existe, redirigir a login
                    Router.push('/login');
                } else {
                    fetchData(); // Cargar los datos si está autenticado
                }
            };
    
            checkAuth();
        }, [Router]);
    */
    /* const fetchData = async () => {
        const profesorID = 20;

        const [asistenciasRes, materiasRes, horariosRes] = await Promise.all([
            fetch(`${URI_ASISTENCIAS}${profesorID}`, {
                method: 'GET',
                credentials: 'include',
            }),
            fetch(`${URI_MATERIAS}${profesorID}`, {
                method: 'GET',
                credentials: 'include',
            }),
            fetch(`${URI_HORARIOS}${profesorID}`, {
                method: 'GET',
                credentials: 'include',
            }),
        ]);

        if (!asistenciasRes.ok || !materiasRes.ok || !horariosRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const asistenciasData = await asistenciasRes.json();
        const materiasData = await materiasRes.json();
        const horariosData = await horariosRes.json();

        setData(asistenciasData);
        setMaterias(materiasData);
        setHorarios(horariosData);
        setLoading(false);
    }; */

    /* if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } */

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Nav.Link><img src="appicon.png" className='icono' alt='App Icon' height={100} /></Nav.Link>
                <Navbar.Brand href="#home">Menú de Asistencias</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href='/dashboard/asistencias'>Asistencias</Nav.Link>
                    <Nav.Link href="/dashboard/materias">Materias</Nav.Link>
                    <Nav.Link href="/dashboard/preceptores">Preceptores</Nav.Link>
                </Nav>
            </Navbar>

            <div className={styles.tarjetas}>
                <Container>
                    <Row>
                        <Col md={8} className="mb-4">
                            <Card className={styles.tarjeta}>
                                <Card.Body>
                                    <Card.Title>Asistencias</Card.Title>
                                    {data ? (
                                        <DonutChart attendance={data.asistencias} absence={data.inasistencias} />
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
                                    {materias.length > 0 ? (
                                        materias.map(materia => (
                                            <Card.Text key={materia.MateriaID}>
                                                {materia.NombreMateria} - {materia.horario}
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
                                    <Card.Title>Clases</Card.Title>
                                    {horarios.length > 0 ? (
                                        horarios.map(horario => (
                                            <Card.Text key={horario.HorarioID}>
                                                {horario.MateriaNombre} -{horario.horaInicio} a {horario.horaFinal}({horario.Dia})
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
