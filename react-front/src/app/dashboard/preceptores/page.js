'use client'
import { Nav, Navbar, Container, Card } from 'react-bootstrap';
import styles from '../page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Asistencias() {
    return (
        <div className="todo">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Nav.Link><img src="appicon.png" className={styles.icono} alt='App Icon' height={100} /></Nav.Link>
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