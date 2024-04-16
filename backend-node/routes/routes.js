import express from 'express'
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, login, updateprofesor } from "../controllers/Controller.js"

const router = express.Router();

router.get('/', getAllprofesores);
router.get('/:id', getprofesor);
router.post('/', createprofesor);
router.put('/:id', updateprofesor);
router.delete('/:id', deleteprofesor);
router.post('/login', login);

export default router;







