import express from 'express';
import { getCuentasTransferencia, 
    addCuentaTransferencia,
    eliminarCuentaTransferencia,
    editarCuentaTransferencia } from '../controllers/transferenciasController.js';

const router = express.Router();

router.get('/', getCuentasTransferencia);
router.post('/', addCuentaTransferencia);
router.delete('/:id', eliminarCuentaTransferencia);
router.put('/:id', editarCuentaTransferencia);

export default router;