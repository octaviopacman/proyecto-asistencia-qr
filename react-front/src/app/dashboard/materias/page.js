'use client'
import { Nav, Navbar, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Asistencias() {
    return (
        <div className="todo">
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
        </div>
    )
}