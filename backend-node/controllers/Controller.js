//importamos el modelo
import profesorModel from '../models/Model.js';

//** Metodos del CRUD */

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







