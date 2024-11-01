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
                /* credentials: 'include' */
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener asistencias');
        }
    }

    /* async obtenerMaterias() {
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
    } */

    //Mostrar todos los horarios
    async mostrarHorarioProfesor(horarioData) {
        const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/horarios/profesor/${profesorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON  .stringify(horarioData)
        });
        return await response.json();
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

    async getAllProfesores() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en getAllProfesores:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en getAllProfesores:', error);
            throw error;
        }
    }

    async getAllHorarios() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/horarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en getAllHorarios:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en getAllHorarios:', error);
            throw error;
        }
    }

    async getAllMaterias() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/materias', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en getAllMaterias:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en getAllMaterias:', error);
            throw error;
        }
    }

    async listadoCursos() {
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/listado/cursos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en listadoCursos:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en listadoCursos:', error);
            throw error;
        }
    }

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
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en insertarHorario:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en insertarHorario:', error);
            throw error;
        }
    }

    async deleteHorario(horarioId) {
        try {
            const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/horarios/${horarioId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en deleteHorario:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error en deleteHorario:', error);
            throw error;
        }
    }
}

