import { Sequelize } from "sequelize";

const db = new Sequelize('bdtecnica', 'root', '4532',{
    host:'localhost',
    dialect: 'mysql',
})

export default db;







