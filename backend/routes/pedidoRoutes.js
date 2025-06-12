import express from 'express'
import { crearPedido, crearDetallePedido, getDetallePedido,getTodosLosDetallesPedidos } from '../controllers/pedidoController.js'

const router = express.Router()

router.post('/', crearPedido)
router.post('/detallepedido', crearDetallePedido)
router.get('/detallepedido/:id', getDetallePedido)
router.get('/todos-detalles', getTodosLosDetallesPedidos)

export default router