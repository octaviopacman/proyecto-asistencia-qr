import jwt from 'jsonwebtoken';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const registrarAsistencia = async (req, res) => {
    const { qrToken } = req.body;
    try {
        //decodifica el token JWT 
        const decoded = jwt.verify(qrToken, secretKey);

        // Obtener fecha y hora en formato adecuado
        const fechaActual = new Date();
        const fecha = fechaActual.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        const hora = fechaActual.toTimeString().split(' ')[0]; // Formato 'HH:MM:SS'

        const nuevaAsistencia = await TablaAsistencia.create({
            ProfesorID: decoded.id,
            Fecha: fecha,
            HoraLlegada: hora
        });

        return res.status(200).json({
            message: 'Asistencia registrada con éxito',
            data: nuevaAsistencia
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        } else {
            console.error('Error al registrar asistencia:', error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
};

export default registrarAsistencia;
