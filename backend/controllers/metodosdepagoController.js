import { getConnection } from '../conexion.js';

export const getMetodosDePago = async (req, res) => {
    const client = await getConnection(); 
    try {
        
        const result = await client.query('SELECT * FROM metodosdepago');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error en getMetodosDePago:', error);
        res.status(500).json({ error: 'Error al obtener métodos de pago' });
    } finally {
        client.release(); 
    }
};