import { getConnection } from '../conexion.js'

export async function crearPedido(req, res) {
  const { ID_Usuario, ID_MetodosDePago, Total } = req.body
  const fecha = new Date()
  const fechaSQL = fecha.toISOString().slice(0, 10)
  const horaSQL = fecha.toTimeString().slice(0, 8)

  try {
    const pool = await getConnection()
    await pool.request()
      .input('ID_Usuario', ID_Usuario)
      .input('ID_MetodosDePago', ID_MetodosDePago)
      .input('Fecha', fechaSQL)
      .input('Hora', horaSQL)
      .input('Total', Total)
      .query(`
        INSERT INTO Pedido (ID_Usuario, ID_MetodosDePago, Fecha, Hora, Total)
        VALUES (@ID_Usuario, @ID_MetodosDePago, @Fecha, @Hora, @Total)
      `)
    res.status(201).json({ message: 'Pedido guardado correctamente' })
  } catch (error) {
  console.error('Error al guardar el pedido:', error); 
  res.status(500).json({ error: 'Error al guardar el pedido' });
  }
}