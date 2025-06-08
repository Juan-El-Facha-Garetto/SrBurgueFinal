import express from 'express';
import { getMetodosDePago } from '../controllers/metodosdepagoController.js';

const router = express.Router();

router.get('/', getMetodosDePago);

export default router;