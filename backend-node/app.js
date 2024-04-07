import express from 'express'
import cors from 'cors';
import db from "./database/db.js";//base de datos
import BlogRoutes from './routes/routes.js'//enrutador

const app = express()

app.use(cors());
app.use(express.json());
app.use('/profesores', BlogRoutes);

try{
    db.authenticate();
    console.log('Conexion exitosa a la DB');
}catch (error){
    console.log('El error de conexion es: ${erorr}');
}

app.get('/', (req, res)=> {
    res.send('hola mundo');
})  


app.listen(8000, ()=>{
    console.log(' Server UP running in http://localhost:8000/');
});




