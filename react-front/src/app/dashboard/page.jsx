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
import { redirect } from 'next/navigation';
import QRCodeComponent from '../login/codigo';
import "./page.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';



const URI = 'http://localhost:8000/login/contarasistencias/12'

function Admin() {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(URI)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    
      // Asegúrate de manejar el estado de la carga de datos (por ejemplo, mostrando un spinner si data es null)
      if (!data) {
        return <div>Loading...</div>;
      }

      

    return (
        <div className='todo'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav.Link><img src="appicon.png" className='icono'></img> </Nav.Link>
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
                                <Card.Text>Materia1</Card.Text>
                                <Card.Text>Materia1</Card.Text>
                                <Card.Text>Materia1</Card.Text>
                                <Card.Text>Materia1</Card.Text>
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
                                
                                <Card.Title>Tu Código QR</Card.Title>,
                                <QRCodeComponent data={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInRpbWUiOiIyMDI0LTA2LTI1VDE4OjU4OjM2LjE1NloiLCJpYXQiOjE3MTkzNDE5MTYsImV4cCI6MTcxOTM0MjUxNn0.uWtxqG_1rpc6G0M2vI6QpOW4yU84cjmEh2cEH-i6QzI'}></QRCodeComponent>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>

            </div>

            )
}


            export default Admin;

