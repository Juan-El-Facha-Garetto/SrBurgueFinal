import express from 'express';
import upload from '../middlewares/multerConfig.js';
import {
    getProductos,
    createProducto,
    getProductoById,
    deleteProducto,
    updateProducto,
    getProductosFiltrados
} from '../controllers/productosController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/filtrados', getProductosFiltrados);
router.get('/:id', getProductoById);

router.post('/',requireAuth, upload.single('Foto'), createProducto);
router.put('/:id',requireAuth, upload.single('Foto'), updateProducto);
router.delete('/:id',requireAuth, deleteProducto);

export default router;