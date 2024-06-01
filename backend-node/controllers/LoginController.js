import { TablaProfesor } from '../models/ModelProfesor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;  

const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const profesor = await TablaProfesor.findOne({ where: { correo } });
        if (profesor) {
            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, profesor.password); //variable para la comparacion de la contrasenia
            if (isMatch) {
                // Generar datos para el QR
                const payload = {
                    id: profesor.id, // ID del profesor
                    time: new Date().toISOString() // Tiempo de generación del token
                };
                const token = jwt.sign(payload, secretKey, { expiresIn: '10m' }); // El token expira en 10min

                return res.status(200).json({
                    message: `Hola ${profesor.nombre} ${profesor.apellido}, bienvenido!`,
                    qrToken: token // Devolvemos el token que será usado para generar el QR
                });
            } else {
                // Contraseña incorrecta
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            // No se encontró ningún profesor con ese correo
            return res.status(404).json({ message: 'Credenciales inválidas o usuario inexistente' });
        }
    } catch (error) {
        console.error('Error al procesar el login:', error);
        return res.status(500).json({ message: error.message });
    }
};

export default login;
