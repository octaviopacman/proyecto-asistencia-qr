//LoginController
//importamos el modelo de la bd
import connection from 'express-myconnection';
import {TablaProfesor} from '../models/ModelProfesor.js';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

//comprobar login

const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        // Buscar al profesor por su correo
        const profesor = await TablaProfesor.findOne({
            where: {
                correo: correo
            }
        });
        const hashqr = await bcrypt.hash(profesor.id.toString(), 10);


        if (profesor) {
            // Verificar la contraseña
            const hashedPassword = profesor.password;

            bcrypt.compare(password, hashedPassword, function(err, result) {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ message: 'Error interno del servidor' });
                } else if (result) {
                    // Contraseña correcta, devolver mensaje de bienvenida

                    return res.status(200).json({ message: `Hola ${profesor.nombre} ${profesor.apellido}, bienvenido! tu hash QR es:`, hashqr } );
                } else {
                    // Contraseña incorrecta
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
            });
        } else {
            // No se encontró ningún profesor con ese correo
            return res.status(404).json({ message: 'Credenciales inválidas o usuario inexistente' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export default login;
