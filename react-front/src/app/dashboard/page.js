'use client'
import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Card } from 'react-bootstrap';

import "./admin.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './donutchart';


const URI = 'http://localhost:8000/profesores/'

function Admin() {
    
    return (
        <div className='todo'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Menú de Asistencias</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Asistencias</Nav.Link>
                        <Nav.Link href="#features">Materias</Nav.Link>
                        <Nav.Link href="#pricing">Preceptores</Nav.Link>

                    </Nav>
                    
                </Container>
            </Navbar>
            <div className='tarjetas'>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Asistencias</Card.Title>
                        <DonutChart attendance={70} absence={30} />



                        
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Materias</Card.Title>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>

                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Clases</Card.Title>
                        <Card.Text>Materia1 - 15:00</Card.Text>
                        <Card.Text>Materia1 - 13:00</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>

                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Materias</Card.Title>
                        <Card.Text>Materia1 - 15:00</Card.Text>
                        <Card.Text>Materia1 - 13:00</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>

                        <Card.Text>Tu Código QR</Card.Text>
                    </Card.Body>
                </Card>
                
            </div>
        </div>
    );
}


export default Admin;

