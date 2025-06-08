import { getConnection } from '../conexion.js'

export async function crearPedido(req, res) {
  console.log('BODY:', req.body);
  const { ID_Usuario, ID_MetodosDePago, Total } = req.body
  const fecha = new Date()
  const fechaSQL = fecha.toISOString().slice(0, 10)
  const horaSQL = fecha.toTimeString().slice(0, 8)

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('ID_Usuario', ID_Usuario)
      .input('ID_MetodosDePago', ID_MetodosDePago)
      .input('Fecha', fechaSQL)
      .input('Hora', horaSQL)
      .input('Total', Total)
      .query(`
        INSERT INTO Pedido (ID_Usuario, ID_MetodosDePago, Fecha, Hora, Total)
        OUTPUT INSERTED.ID
        VALUES (@ID_Usuario, @ID_MetodosDePago, @Fecha, @Hora, @Total)
      `)
    const pedidoId = result.recordset[0].ID;
    res.status(201).json({ message: 'Pedido guardado correctamente', id: pedidoId })
  } catch (error) {
    console.error('Error al guardar el pedido:', error); 
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
}

export const getDetallePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('ID_Pedido', id)
      .query(`
        SELECT dp.*, p.Nombre as NombreProducto
        FROM DetallePedido dp
        JOIN Producto p ON dp.ID_Producto = p.ID
        WHERE dp.ID_Pedido = @ID_Pedido
      `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el detalle del pedido:', error);
    res.status(500).json({ error: 'Error al obtener el detalle del pedido' });
  }
};

export const crearDetallePedido = async (req, res) => {
  const { ID_Pedido, ID_Producto, Cantidad, PrecioUnitario, Subtotal, Observaciones } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('ID_Pedido', ID_Pedido)
      .input('ID_Producto', ID_Producto)
      .input('Cantidad', Cantidad)
      .input('PrecioUnitario', PrecioUnitario)
      .input('Subtotal', Subtotal)
      .input('Observaciones', Observaciones)
      .query(`
        INSERT INTO DetallePedido (ID_Pedido, ID_Producto, Cantidad, PrecioUnitario, Subtotal, Observaciones)
        VALUES (@ID_Pedido, @ID_Producto, @Cantidad, @PrecioUnitario, @Subtotal, @Observaciones)
      `);
    res.status(201).json({ message: 'Detalle de pedido guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el detalle de pedido' });
  }
};