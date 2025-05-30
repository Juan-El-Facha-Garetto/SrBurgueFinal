import express from 'express';
import { agregarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/register', agregarUsuario);

export default router;