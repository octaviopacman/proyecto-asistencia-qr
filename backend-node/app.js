import express from 'express'
import cors from 'cors';
import db from "./database/db.js";//base de datos
import Routes from './routes/routes.js'//enrutador
import { login } from './controllers/Controller.js';

const app = express()

app.use(express.urlencoded({ extended: true }));


app.use(cors()); /* {
    origin: ["http://localhost:3000"], // o solo una cadena si es un solo origen
    methods: ['GET', 'POST'],
} */

app.use(express.json());
app.use('/profesores', Routes);
app.post('/login', login);
try{
    db.authenticate();
    console.log('Conexion exitosa a la DB');
}catch (error){
    console.log('El error de conexion es: ${erorr}');
}

/* app.get('/', (req, res)=> {
    res.send('hola mundo');
})  
 */

app.listen(8000, ()=>{
    console.log(' Server UP running in http://localhost:8000/');
});




