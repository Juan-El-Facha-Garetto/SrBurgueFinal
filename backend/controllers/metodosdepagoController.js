import { getConnection } from '../conexion.js';

export const getMetodosDePago = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM MetodosDePago');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener métodos de pago' });
    }
};