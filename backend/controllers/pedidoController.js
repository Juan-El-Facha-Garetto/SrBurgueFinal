import { getConnection } from '../conexion.js'

export async function crearPedido(req, res) {
  console.log('BODY:', req.body);
  const { id_metodosdepago, total } = req.body;
  const fecha = new Date();
  const fechaSQL = fecha.toISOString().slice(0, 10);
  const horaSQL = fecha.toTimeString().slice(0, 8);

  try {
    const client = await getConnection();
    const result = await client.query(
      `INSERT INTO pedido (id_metodosdepago, fecha, hora, total)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [id_metodosdepago, fechaSQL, horaSQL, total]
    );
    const pedidoId = result.rows[0].id;
    res.status(201).json({ message: 'Pedido guardado correctamente', id: pedidoId });
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
}

export const getDetallePedido = async (req, res) => {
  let { id } = req.params;
  console.log('Obteniendo detalle de pedido para id:', id);
  // Forzar a número si es posible
  if (!isNaN(id)) {
    id = Number(id);
  }
  try {
    const client = await getConnection();
    const result = await client.query(
      `SELECT dp.*, p.nombre as nombreproducto
       FROM detallepedido dp
       JOIN producto p ON dp.id_producto = p.id
       WHERE dp.id_pedido = $1`,
      [id]
    );
    console.log('Filas encontradas:', result.rows.length);
    console.log('Contenido de result.rows:', result.rows);
    if (result.rows.length === 0) {
      console.log('No se encontraron detalles para el pedido con id:', id);
    }
    // Normalizar campo foto: si es null, devolver string vacío
    const normalizados = result.rows.map(row => {
      if (row.foto === null || row.foto === undefined) {
        return { ...row, foto: '' };
      }
      return row;
    });
    res.json(normalizados);
  } catch (error) {
    console.error('Error al obtener el detalle del pedido:', error.message, error.stack);
    res.status(500).json({ error: 'Error al obtener el detalle del pedido', detalle: error.message });
  }
};

export const crearDetallePedido = async (req, res) => {
  console.log('Recibido en backend:', req.body);
  const { id_pedido, id_producto, cantidad, preciounitario, subtotal, observaciones } = req.body;
  try {
    const client = await getConnection();
    await client.query(
      `INSERT INTO detallepedido (id_pedido, id_producto, cantidad, preciounitario, subtotal, observaciones)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_pedido, id_producto, cantidad, preciounitario, subtotal, observaciones]
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
        dp.id AS id_detalle,
        dp.id_pedido,
        pe.fecha,
        pe.hora,
        p.nombre AS nombreproducto,
        dp.cantidad,
        dp.preciounitario,
        dp.subtotal,
        dp.observaciones
      FROM detallepedido dp
      JOIN pedido pe ON dp.id_pedido = pe.id
      JOIN producto p ON dp.id_producto = p.id
      ORDER BY pe.fecha DESC, pe.hora DESC, dp.id_pedido DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener todos los detalles de pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de pedidos' });
  }
};