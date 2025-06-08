import express from 'express';
import { getCuentasTransferencia, addCuentaTransferencia } from '../controllers/transferenciasController.js';

const router = express.Router();

router.get('/', getCuentasTransferencia);
router.post('/', addCuentaTransferencia);

export default router;