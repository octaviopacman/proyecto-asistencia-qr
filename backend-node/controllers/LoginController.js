//LoginController
//importamos el modelo de la bd
import connection from 'express-myconnection';
import {TablaProfesor} from '../models/ModelProfesor.js';
import { Sequelize } from 'sequelize';

//comprobar login
const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const profesor = await TablaProfesor.findOne({
            where: {
                correo: correo,
                password: password  
            }});
        if (profesor) {
            //aca se puede agregar autenticacion adicional para el profesor, como hash de contra y demas
            return res.status(200).json(profesor);
        } else {
            return res.status(404).json({ message: 'Credenciales inválidas o usuario inexistente' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export default login;
