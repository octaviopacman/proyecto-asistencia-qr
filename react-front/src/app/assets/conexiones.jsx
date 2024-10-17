export class Dashboard {
    constructor(token){
        this.token = token;
    }
    async contarAsistencias(){
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login/contarasistencias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'autorizacion': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener asistencias');
        }
    }
    async obtenerMaterias(){
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/materias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'autorizacion': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener materias');
        }
    }
    async mostrarHorarioProfesor(){
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/horario/profesor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'autorizacion': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener cursos de profesores');
        }
    }
    async mostrarHorarioCurso(){
        console.log(this.token);
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/listado/horario/curso', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'autorizacion': `Bearer ${this.token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener cursos');
        }
    }

}

export class Login {
    async iniciarSesion(correo, password){
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Correo: correo,
                    Password: password,
                }),
                credentials: 'include'
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al iniciar sesión');
        }
    }
}




