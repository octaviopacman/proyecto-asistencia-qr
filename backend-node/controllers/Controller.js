//importamos el modelo de la bd
import connection from 'express-myconnection';
import {TablaProfesor, TablaAsistencia, TablaCurso, TablaHorario, TablaMateria} from '../models/Model.js';
import { Sequelize } from 'sequelize';

//comprobar login
export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const profesor = await TablaProfesor.findOne({
            where: {
                Correo: correo,
                ContrasenaHash: password  
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
//mostrar todos los registros
export const getAllprofesores = async (req, res) => {
    try{
        const blogs = await TablaProfesor.findAll();
        res.json(blogs);
    } catch (error){
        res.json( {message: error.message} );
    }
}
//mostrar un registro 
export const getprofesor = async (req, res) => {
    try {
        const blog = await TablaProfesor.findAll({
            where:{ id:req.params.id }
        });
        res.json(blog[0]);
    } catch(error){
        res.json( {message: error.message} );
    }
}
//crear un registro
export const createprofesor = async (req, res) => {
    try{
      await  TablaProfesor.create(req.body);
      res.json({
        'message':'Registro Creado correctamente'
      });
    } catch (error){
        res.json( {message: error.message} );
    }
}
//actualizar un registro
export const updateprofesor = async (req, res) =>{
    try{
        TablaProfesor.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            'message':'registro actualizado correctamente'
        })
    }catch (error){
        res.json( {message: error.message} );
    }
}
//eliminar registro
export const deleteprofesor = async (req, res) => {
    try {
        await TablaProfesor.destroy({
            where: { id: req.params.id }
        });
        res.json({
            'message': 'Registro eliminado correctamente'
        });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(409).json({ 'message': 'No se puede eliminar el profesor porque está referenciado por otros registros.' });
        } else {
            // Manejar otros tipos de errores
            res.status(500).json({ 'message': error.message });
        }
    }
}








