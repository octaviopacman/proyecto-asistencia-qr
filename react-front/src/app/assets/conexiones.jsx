export class Dashboard {
    constructor(token) {
        this.token = token;
    }

    async contarAsistencias() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login/contarasistencias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener asistencias');
        }
    }

    async obtenerMaterias() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/materias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener materias');
        }
    }

    async mostrarHorarioProfesor() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/horario/profesor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener horarios de profesores');
        }
    }

    async mostrarHorarioCurso() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/horario/curso', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener horarios de cursos');
        }
    }

    async obtenerProfesores() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/profesores', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener profesores');
        }
    }

    async listarCursos() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/cursos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener cursos");
        }
    }

    async insertarHorarios() {
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/insertar/horarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener horarios');
        }
    }
}


export class Sesion {

    async iniciarSesion(correo, password) {
        console.log(this.session);  // Verifica que la sesión esté inicializada
        console.log(correo);
        console.log(password);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: correo,
                    password: password,
                }),
                credentials: 'include'
            });
            
            if (response.status === 401) {
                return { error: 'Correo y contraseña no coinciden' };
            } else if (response.status === 404) {
                return { error: 'El correo no existe' };
            } else if (!response.ok) {
                return { error: 'Error al iniciar sesión' };
            }
    
            const data = await response.json();
            return data
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al iniciar sesión');
        }
    }
}



