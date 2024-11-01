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
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/profesores', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async getAllHorarios() {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/horarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async getAllMaterias() {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/materias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async listadoCursos() {
        const response = await fetch('https://backend-asistencia-qr.vercel.app/api/admin/listado/cursos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

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

    async deleteHorario(horarioId) {
        const response = await fetch(`https://backend-asistencia-qr.vercel.app/api/admin/horarios/${horarioId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }
}
