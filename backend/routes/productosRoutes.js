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

const router = express.Router();

router.get('/', getProductos);
router.get('/filtrados', getProductosFiltrados);
router.get('/:id', getProductoById);
router.post('/', upload.single('Foto'), createProducto);
router.put('/:id', upload.single('Foto'), updateProducto);
router.delete('/:id', deleteProducto);

export default router;