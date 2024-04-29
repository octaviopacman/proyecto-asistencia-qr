import { Sequelize } from "sequelize";

const db = new Sequelize('bdtecnica', 'root', 'Octavio037401',{
    host:'localhost',
    dialect: 'mysql',
})

export default db;







