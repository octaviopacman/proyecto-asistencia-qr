export class Dashboard {
    constructor(token){
        this.token = token;
    }
    async contarAsistencias(){
        try {
            const response = await fetch('https://backend-asistencia-qr.vercel.app/api/login/contarasistencias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
            });
            const data = await response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener asistencias');
        }
    }
}



