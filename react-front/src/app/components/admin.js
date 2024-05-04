import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./admin.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DonutChart from './admin/donutchart';
import AttendanceDoughnut from './admin/donutchart';
import TiempoParaClases from './clases';

const URI = 'http://localhost:8000/profesores/'

const Admin = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs();
    }, []);

    let horaActual = new Date();
    let horas = horaActual.getHours();
    let minutos = horaActual.getMinutes();
    let ampm = horas >= 12 ? 'PM' : 'AM';

    horas = horas % 12;
    horas = horas ? horas : 12; // la hora '0' debe ser '12'
    minutos = minutos < 10 ? '0' + minutos : minutos;

    let strHora = horas + ':' + minutos + ' ' + ampm;
    console.log(strHora);
    



    const getBlogs = async () => {
        try {
            const response = await fetch(URI);
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error:', error);
            // Optionally update the UI to show an error message
        }
    }

    const deleteBlog = async (id) => {
        try {
            await fetch(`${URI}${id}`, {
                method: 'DELETE'
            });
            getBlogs();
        } catch (error) {
            console.error('Error:', error);
            // Optionally update the UI to show an error message
        }
    }

    return (
        <div className='todo'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Menú de Asistencias</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Asistencias</Nav.Link>
                        <Nav.Link href="#features">Materias</Nav.Link>
                        <Nav.Link href="#pricing">Preceptores</Nav.Link>
                        <p className='hora'>{strHora}</p>

                    </Nav>
                    
                </Container>
            </Navbar>
            <div className='tarjetas'>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Asistencias</Card.Title>
                        <AttendanceDoughnut absence={70} attendance={30} />



                        <Link className="btn btn-primary" to="/somewhere">Ver Asistencias</Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Materias</Card.Title>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>

                        <Link className='btn btn-primary'>Ver Materias</Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='tarjeta'>

                    <Card.Body>
                        <Card.Title>Clases</Card.Title>
                        <Card.Text>Materia1 - 15:00</Card.Text>
                        <Card.Text>Materia1 - 13:00</Card.Text>
                        <Card.Text>Materia1</Card.Text>
                        <Card.Text>Materia1</Card.Text>

                        <Link className='btn btn-primary'>Ver Materias</Link>
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
                <TiempoParaClases />
            </div>
        </div>
    );
}


export default Admin;

