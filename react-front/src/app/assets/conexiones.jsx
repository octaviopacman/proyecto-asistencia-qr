export class Dashboard {
    constructor(token) {
        this.token = token;
        this.baseUrl = 'https://backend-asistencia-qr.vercel.app/api';
    }

    async contarAsistencias() {
        try {
            const response = await fetch(`${this.baseUrl}/profesor/login/contarasistencias`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            if (!response.ok) throw new Error('Error al obtener asistencias');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener asistencias');
        }
    }

    async mostrarHorarioProfesor() {
        try {
            const response = await fetch(`${this.baseUrl}/profesor/listado/horario/profesor/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener el horario del profesor');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al mostrar el horario del profesor');
        }
    }
}

export class Sesion {
    async iniciarSesion(correo, password) {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, password }),
                credentials: 'include'
            });

            if (response.status === 401) {
                return { error: 'Correo y contraseña no coinciden' };
            } else if (response.status === 404) {
                return { error: 'El correo no existe' };
            } else if (!response.ok) {
                return { error: 'Error al iniciar sesión' };
            }
            return await response.json();
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

    // Profesores
    async getAllProfesores() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener profesores');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener profesores');
        }
    }

    async getProfesor(id) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener el profesor');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener el profesor');
        }
    }

    async createProfesor(profesorData) {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(profesorData)
            });
            if (!response.ok) throw new Error('Error al crear el profesor');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el profesor');
        }
    }

    async updateProfesor(id, profesorData) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(profesorData)
            });
            if (!response.ok) throw new Error('Error al actualizar el profesor');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar el profesor');
        }
    }

    async deleteProfesor(id) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/profesores/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al eliminar el profesor');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar el profesor');
        }
    }

    // Cursos
    async crearCurso(cursoData) {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/crear/curso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(cursoData)
            });
            if (!response.ok) throw new Error('Error al crear el curso');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear el curso');
        }
    }

    async ListadoCursos() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/listado/cursos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener cursos');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener cursos');
        }
    }

    // Horarios
    async insertarHorario(horarioData) {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/insertar/horario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(horarioData)
            });
            if (!response.ok) throw new Error('Error al insertar horario');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al insertar horario');
        }
    }

    async eliminarHorario(horarioId) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/horarios/${horarioId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al eliminar horario');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar horario');
        }
    }

    async mostrarTodosLosHorarios() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/horarios', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener horarios');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener horarios');
        }
    }

    // Materias
    async insertarMateria(materiaData) {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/insertar/materias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(materiaData)
            });
            if (!response.ok) {
                const errorText = await response.text();  // Obtener detalles del error desde el servidor
                console.error("Detalles del error del servidor:", errorText);  // Registrar detalles
                throw new Error('Error al insertar horario');
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error en insertarHorario:", error);
            throw new Error('Error al insertar horario');
        }
    }

    async eliminarMateria(materiaId) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/materias/${materiaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al eliminar materia');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar materia');
        }
    }

    async ListadoMaterias() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/listado/materias', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener materias');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener materias');
        }
    }
}
