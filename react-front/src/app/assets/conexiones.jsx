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

    async mostrarHorarioProfesor(profesorId) {
        try {
            const response = await fetch(`${this.baseUrl}/admin/horarios/profesor/${profesorId}`, {
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

    async getAllProfesores() {
        try {
            const response = await fetch(`${this.baseUrl}/profesores`, {
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

    async getAllHorarios() {
        try {
            const response = await fetch(`${this.baseUrl}/horarios`, {
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

    async getAllMaterias() {
        try {
            const response = await fetch(`${this.baseUrl}/materias`, {
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

    async listadoCursos() {
        try {
            const response = await fetch(`${this.baseUrl}/listado/cursos`, {
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

    async insertarHorario(horarioData) {
        try {
            const response = await fetch(`${this.baseUrl}/insertar/horario`, {
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

    async deleteHorario(horarioId) {
        try {
            const response = await fetch(`${this.baseUrl}/horarios/${horarioId}`, {
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
}
