import express from 'express'
import { crearPedido, crearDetallePedido, getDetallePedido } from '../controllers/pedidoController.js'

const router = express.Router()

router.post('/', crearPedido)
router.post('/detallepedido', crearDetallePedido)
router.get('/detallepedido/:id', getDetallePedido)

export default router