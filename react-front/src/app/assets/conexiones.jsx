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
}





