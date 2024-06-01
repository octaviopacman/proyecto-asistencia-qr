import express from 'express'
import cors from 'cors';
import db from "./database/db.js";//base de datos
import Routes from './routes/routes.js'//enrutador
import login from './controllers/LoginController.js';
import asistencia from './controllers/AsistenciaController.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors(/* {
    origin: ["http://localhost:3000"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
} */));

app.use(express.json());
app.use('/profesores', Routes);
app.post('/login', login);
app.post('/login/asistencia', asistencia);

try{
    db.authenticate();
    console.log('Conexion exitosa a la DB');
}catch (error){
    console.log('El error de conexion es: ${error}');
}

/* app.get('/', (req, res)=> {
    res.send('hola mundo');
})  
 */

app.listen(8000, ()=>{
    console.log(' Server UP running in http://localhost:8000/');
});




