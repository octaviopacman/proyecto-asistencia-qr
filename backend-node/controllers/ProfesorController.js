//importamos el modelo de la bd
import connection from 'express-myconnection';
import { TablaProfesor } from '../models/ModelProfesor.js';
import TablaHorario  from '../models/ModelHorario.js';
import  {TablaAsistencia}  from '../models/ModelAsistencia.js';
import { Sequelize } from 'sequelize';
import db from '../database/db.js';
import bcrypt from 'bcryptjs';

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
//crear registro
export const createprofesor = async (req, res) => {
    try {
        // Hashea la contraseña antes de insertarla en la base de datos
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        // Crea un nuevo objeto con la contraseña hasheada
        const nuevoProfesor = {
            ...req.body,
            password: hashedPassword
        };
        // Crea el registro en la base de datos
        await TablaProfesor.create(nuevoProfesor);

        res.json({
            'message': 'Registro Creado correctamente'
        });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
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
    const idProfesor = req.params.id;

    const t = await db.transaction();
    try {
        // Eliminar las relaciones en TablaHorario
        await TablaHorario.destroy({
            where: { ProfesorID: idProfesor }
        }, { transaction: t });

        // Eliminar las relaciones en TablaAsistencia
        await TablaAsistencia.destroy({
            where: { ProfesorID: idProfesor }
        }, { transaction: t });
        
        //eliminar el profesor
        await TablaProfesor.destroy({
            where: { id: idProfesor }
        }, { transaction: t });

        // Si todo sale bien, hacemos commit de la transacción
        await t.commit();

        res.json({
            'message': 'Profesor y todas sus relaciones eliminadas correctamente'
        });

    } catch (error) {
        // Si hay un error, revertimos los cambios
        await t.rollback();

        res.status(500).json({ 'message': error.message });
    }
}








