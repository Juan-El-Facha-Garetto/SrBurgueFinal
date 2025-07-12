import express from 'express';
import { loginUsuario } from '../controllers/UsuarioController.js';

const router = express.Router();


router.post('/login', loginUsuario);

export default router;