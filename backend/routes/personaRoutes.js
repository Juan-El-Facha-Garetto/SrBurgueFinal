import express from 'express';
import { agregarPersona, obtenerPersonas } from'../controllers/personaController.js';
import { requireAuth } from '../middlewares/auth.js';


const  router = express.Router();

router.post('/register', agregarPersona);
router.get('/all',requireAuth, obtenerPersonas);


export default router;