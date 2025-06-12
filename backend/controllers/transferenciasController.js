import { getConnection } from '../conexion.js';

export const getCuentasTransferencia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM CuentaTransferencia');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuentas de transferencia' });
  }
};

export const addCuentaTransferencia = async (req, res) => {
  const { Alias, Cuit, NombreYApellido, Entidad } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('Alias', Alias)
      .input('Cuit', Cuit)
      .input('NombreYApellido', NombreYApellido)
      .input('Entidad', Entidad)
      .query('INSERT INTO CuentaTransferencia (Alias, Cuit, NombreYApellido, Entidad) VALUES (@Alias, @Cuit, @NombreYApellido, @Entidad)');
    res.json({ message: 'Cuenta de transferencia agregada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar cuenta de transferencia' });
  }
};
export const eliminarCuentaTransferencia = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('ID', req.params.id)
      .query('DELETE FROM CuentaTransferencia WHERE ID = @ID');
    res.status(200).json({ message: 'Cuenta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
};

export const editarCuentaTransferencia = async (req, res) => {
  try {
    const { Alias, Cuit, NombreYApellido, Entidad } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input('ID', req.params.id)
      .input('Alias', Alias)
      .input('Cuit', Cuit)
      .input('NombreYApellido', NombreYApellido)
      .input('Entidad', Entidad)
      .query(`
        UPDATE CuentaTransferencia
        SET Alias = @Alias, Cuit = @Cuit, NombreYApellido = @NombreYApellido, Entidad = @Entidad
        WHERE ID = @ID
      `);
    res.status(200).json({ message: 'Cuenta actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar la cuenta' });
  }
};