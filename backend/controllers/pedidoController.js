import { getConnection } from '../conexion.js'

export async function crearPedido(req, res) {
  console.log('BODY:', req.body);
  const { ID_Usuario, ID_MetodosDePago, Total } = req.body
  const fecha = new Date()
  const fechaSQL = fecha.toISOString().slice(0, 10)
  const horaSQL = fecha.toTimeString().slice(0, 8)

  try {
    const client = await getConnection()
    const result = await client.query(
      `INSERT INTO Pedido (ID_Usuario, ID_MetodosDePago, Fecha, Hora, Total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ID`,
      [ID_Usuario, ID_MetodosDePago, fechaSQL, horaSQL, Total]
    )
    const pedidoId = result.rows[0].id;
    res.status(201).json({ message: 'Pedido guardado correctamente', id: pedidoId })
  } catch (error) {
    console.error('Error al guardar el pedido:', error); 
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
}

export const getDetallePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await getConnection();
    const result = await client.query(
      `SELECT dp.*, p.Nombre as NombreProducto
       FROM DetallePedido dp
       JOIN Producto p ON dp.ID_Producto = p.ID
       WHERE dp.ID_Pedido = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener el detalle del pedido:', error);
    res.status(500).json({ error: 'Error al obtener el detalle del pedido' });
  }
};

export const crearDetallePedido = async (req, res) => {
  console.log('Recibido en backend:', req.body);
  const { ID_Pedido, ID_Producto, Cantidad, PrecioUnitario, Subtotal, Observaciones } = req.body;
  try {
    const client = await getConnection();
    await client.query(
      `INSERT INTO DetallePedido (ID_Pedido, ID_Producto, Cantidad, PrecioUnitario, Subtotal, Observaciones)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [ID_Pedido, ID_Producto, Cantidad, PrecioUnitario, Subtotal, Observaciones]
    );
    res.status(201).json({ message: 'Detalle de pedido guardado' });
  } catch (error) {
    console.error('Error al guardar el detalle de pedido:', error);
    res.status(500).json({ error: 'Error al guardar el detalle de pedido' });
  }
};

// Detalles de pedido para administrador
export const getTodosLosDetallesPedidos = async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query(`
      SELECT 
        dp.ID AS ID_Detalle,
        dp.ID_Pedido,
        pe.Fecha,
        pe.Hora,
        p.Nombre AS NombreProducto,
        dp.Cantidad,
        dp.PrecioUnitario,
        dp.Subtotal,
        dp.Observaciones
      FROM DetallePedido dp
      JOIN Pedido pe ON dp.ID_Pedido = pe.ID
      JOIN Producto p ON dp.ID_Producto = p.ID
      ORDER BY pe.Fecha DESC, pe.Hora DESC, dp.ID_Pedido DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener todos los detalles de pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de pedidos' });
  }
};