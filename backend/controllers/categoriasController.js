import { getConnection } from '../conexion.js';

export const getCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT ID, Seccion, Detalle FROM Categoria");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};