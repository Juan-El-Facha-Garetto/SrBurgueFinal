import express from 'express';
import { agregarPersona, obtenerPersonas } from'../controllers/personaController.js';

const  router = express.Router();

router.post('/register', agregarPersona);
router.get('/all', obtenerPersonas);


export default router;