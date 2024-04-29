import { Sequelize } from "sequelize";

const db = new Sequelize('bdtecnica', 'root', '',{
    host:'localhost',
    dialect: 'mysql',
})

export default db;







