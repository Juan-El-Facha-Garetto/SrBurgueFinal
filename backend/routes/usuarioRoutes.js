import express from 'express';
import { agregarUsuario, loginUsuario } from '../controllers/UsuarioController.js';

const router = express.Router();

router.post('/register', agregarUsuario);
router.post('/login', loginUsuario);

export default router;