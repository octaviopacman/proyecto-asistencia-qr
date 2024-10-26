export class Dashboard {
    constructor(token) {
        this.token = token;
    }

    async contarAsistencias() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/profesor/login/contarasistencias', {
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
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/profesor/listado/materias', {
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
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/profesor/listado/horario/profesor', {
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
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/profesor/listado/horario/curso', {
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

export class Admin {
    constructor(token) {
        this.token = token;
    }

    // Obtener todos los profesores
    async getAllProfesores() {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    // Obtener un profesor por ID
    async getProfesor(id) {
        const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    // Crear un nuevo profesor
    async createProfesor(profesorData) {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(profesorData)
        });
        return await response.json();
    }

    // Actualizar un profesor por ID
    async updateProfesor(id, profesorData) {
        const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(profesorData)
        });
        return await response.json();
    }

    // Eliminar un profesor por ID
    async deleteProfesor(id) {
        const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    // Insertar un horario
    async insertarHorario(horarioData) {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/insertar/horario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(horarioData)
        });
        return await response.json();
    }

    // Crear un nuevo curso
    async crearCurso(cursoData) {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/crear/curso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(cursoData)
        });
        return await response.json();
    }

    // Obtener listado de cursos
    async ListadoCursos() {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/listado/cursos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    // Insertar una materia
    async insertarMateria(materiaData) {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/insertar/materias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(materiaData)
        });
        return await response.json();
    }
}
