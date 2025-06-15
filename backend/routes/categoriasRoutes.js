import express from 'express';
import { getCategorias,crearCategoria,eliminarCategoria,editarCategoria } from '../controllers/categoriasController.js';

const router = express.Router();
router.get('/', getCategorias);
router.post('/', crearCategoria);
router.delete('/:id', eliminarCategoria);
router.put('/:id', editarCategoria);

export default router;