import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const bd = process.env.BaseDeDatos;
const usuario = process.env.user;
const password = process.env.passw;

const db = new Sequelize(bd, usuario, password,{
    host:'127.0.0.1',
    dialect: 'mysql',
})

export default db;







