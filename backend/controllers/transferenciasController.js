import { getConnection } from '../conexion.js';

export const getCuentasTransferencia = async (req, res) => {
  const client = await getConnection();
  try {
    const result = await client.query('SELECT * FROM cuentatransferencia');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuentas de transferencia' });
  }finally {
    client.release();
  }
};

export const addCuentaTransferencia = async (req, res) => {
  const { alias, cuit, nombreyapellido, entidad } = req.body;
  const client = await getConnection();
  try {
    await client.query(
      'INSERT INTO CuentaTransferencia (alias, cuit, nombreyapellido, entidad) VALUES ($1, $2, $3, $4)',
      [alias, cuit, nombreyapellido, entidad]
    );
    res.json({ message: 'Cuenta de transferencia agregada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar cuenta de transferencia' });
  }finally {
    client.release();
  }
};
export const eliminarCuentaTransferencia = async (req, res) => {
  const client = await getConnection();
  try {
    await client.query('DELETE FROM CuentaTransferencia WHERE id = $1', [req.params.id]);
    res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }finally {
    client.release();
  }
};

export const editarCuentaTransferencia = async (req, res) => {
  const client = await getConnection();
  try {
    const { alias, cuit, nombreyapellido, entidad } = req.body;
    await client.query(
      `UPDATE CuentaTransferencia
       SET alias = $1, cuit = $2, nombreyapellido = $3, entidad = $4
       WHERE id = $5`,  
      [alias, cuit, nombreyapellido, entidad, req.params.id]
    );
    res.status(200).json({ message: 'Cuenta actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar la cuenta' });
  }
  finally {
    client.release();
  }
};