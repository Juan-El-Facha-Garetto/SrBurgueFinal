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