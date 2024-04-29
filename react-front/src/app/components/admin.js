import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./admin.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const URI = 'http://localhost:8000/profesores/'

const Admin = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs();
    }, []);

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
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Asistencias</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Card style={{ width: '18rem' }} className='tarjeta'>
                <Card.Img variant="top" src="pngegg.png" style={{ width: '100px' }} />
                <Card.Body>
                    <Card.Title>Asistencias</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Link className="btn btn-primary" to="/somewhere">Go somewhere</Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Admin;
