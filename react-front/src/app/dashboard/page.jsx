'use client'
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
import "./page.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';
import { useRouter } from 'next/navigation';

const URI_MATERIAS = 'https://backend-asistencia-qr.vercel.app/profesor/';
const URI_ASISTENCIAS = 'https://backend-asistencia-qr.vercel.app/api/login/contarasistencias/';

function Admin() {
    const [data, setData] = useState(null);
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Router = useRouter();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInRpbWUiOiIyMDI0LTA5LTE4VDIyOjI2OjUyLjYxMVoiLCJpYXQiOjE3MjY2OTg0MTIsImV4cCI6MTcyNjY5OTAxMn0.o7o6s18zKfoc5TWT1kitJVoyX8zKeJmIgLLOXsE10W8';

    useEffect(() => {
        const profesorID = 20;

        if (!profesorID) {
            Router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch para asistencias y materias al mismo tiempo
                const [asistenciasRes, materiasRes] = await Promise.all([
                    fetch(`${URI_ASISTENCIAS}${profesorID}`),
                    fetch(`${URI_MATERIAS}${profesorID}`)
                ]);

                if (!asistenciasRes.ok || !materiasRes.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const asistenciasData = await asistenciasRes.json();
                const materiasData = await materiasRes.json();

                setData(asistenciasData);
                setMaterias(materiasData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Hubo un error al obtener los datos');
                setLoading(false);
            }
        };

        fetchData();
    }, [Router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='todo'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav.Link><img src="appicon.png" className='icono' alt='App Icon' /></Nav.Link>
                    <Navbar.Brand href="#home">Menú de Asistencias</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href='/dashboard/asistencias'>Asistencias</Nav.Link>
                        <Nav.Link href="/dashboard/materias">Materias</Nav.Link>
                        <Nav.Link href="/dashboard/preceptores">Preceptores</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className='mt-4'>
                <Row>
                    <Col md={4} className='mb-4'>
                        <Card className='tarjeta'>
                            <Card.Body>
                                <Card.Title>Asistencias</Card.Title>
                                <DonutChart attendance={data.asistencias} absence={data.inasistencias} />
                                <Button href='/dashboard/asistencias'>Ver más</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8} className='mb-4'>
                        <Card className='tarjeta'>
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
                    <Col md={8} className='mb-4'>
                        <Card className='tarjeta'>
                            <Card.Body>
                                <Card.Title>Clases</Card.Title>
                                <Card.Text>Materia1 - 15:00</Card.Text>
                                <Card.Text>Materia1 - 13:00</Card.Text>
                                <Card.Text>Materia1</Card.Text>
                                <Card.Text>Materia1</Card.Text>
                                <Button href='/dashboard/materias'>Ver más</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className='mb-4'>
                        <Card className='tarjeta-QR'>
                            <Card.Body>
                                <Card.Title>Tu Código QR</Card.Title>
                                <QRCodeComponent data={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInRpbWUiOiIyMDI0LTA2LTI1VDE4OjU4OjM2LjE1NloiLCJpYXQiOjE3MTkzNDE5MTYsImV4cCI6MTcxOTM0MjUxNn0.uWtxqG_1rpc6G0M2vI6QpOW4yU84cjmEh2cEH-i6QzI'} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Admin;
