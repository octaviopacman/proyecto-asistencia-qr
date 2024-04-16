//importamos el modelo de la bd
import connection from 'express-myconnection';
import profesorModel from '../models/Model.js';
import { Sequelize } from 'sequelize';


export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const profesor = await profesorModel.findOne({
            where: {
                Correo: correo,
                ContrasenaHash: password  
            }
        });

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
        const blogs = await profesorModel.findAll();
        res.json(blogs);
    } catch (error){
        res.json( {message: error.message} );
    }
}
//mostrar un registro 
export const getprofesor = async (req, res) => {
    try {
        const blog = await profesorModel.findAll({
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
      await  profesorModel.create(req.body);
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
        profesorModel.update(req.body, {
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
export const deleteprofesor = (req, res) =>{
    try{
        profesorModel.destroy({
            where: { id: req.params.id}
        });
        res.json({
            'message':'registro eliminado correctamente'
        });
    }catch (error){
        res.json( {message: error.message} );
    }
}







