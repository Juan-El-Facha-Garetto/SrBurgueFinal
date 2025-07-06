import { getConnection } from '../conexion.js';

export const getCuentasTransferencia = async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM CuentaTransferencia');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuentas de transferencia' });
  }
};

export const addCuentaTransferencia = async (req, res) => {
  const { alias, cuit, nombreyapellido, entidad } = req.body;
  try {
    const client = await getConnection();
    await client.query(
      'INSERT INTO CuentaTransferencia (alias, cuit, nombreyapellido, entidad) VALUES ($1, $2, $3, $4)',
      [alias, cuit, nombreyapellido, entidad]
    );
    res.json({ message: 'Cuenta de transferencia agregada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar cuenta de transferencia' });
  }
};
export const eliminarCuentaTransferencia = async (req, res) => {
  try {
    const client = await getConnection();
    await client.query('DELETE FROM CuentaTransferencia WHERE ID = $1', [req.params.id]);
    res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
};

export const editarCuentaTransferencia = async (req, res) => {
  try {
    const { alias, cuit, nombreyapellido, entidad } = req.body;
    const client = await getConnection();
    await client.query(
      `UPDATE CuentaTransferencia
       SET alias = $1, cuit = $2, nombreyapellido = $3, entidad = $4
       WHERE ID = $5`,  
      [alias, cuit, nombreyapellido, entidad, req.params.id]
    );
    res.status(200).json({ message: 'Cuenta actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar la cuenta' });
  }
};