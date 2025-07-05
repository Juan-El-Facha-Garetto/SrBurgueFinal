import { getConnection } from '../conexion.js';

export const getCategorias = async (req, res) => {
    try {
        const client = await getConnection();
        const result = await client.query('SELECT ID, Seccion FROM Categoria');
        res.json(result.rows);
    } catch (error) {
        console.error('Error en getCategorias:', error);
        res.status(500).json({ error: 'Error al obtener categorías', detalle: error.message });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { Seccion } = req.body;
        const client = await getConnection();
        await client.query('INSERT INTO Categoria (Seccion) VALUES ($1)', [Seccion]);
        res.status(201).json({ message: 'Categoría creada exitosamente' });
    } catch (error) {
        console.error('Error en crearCategoria:', error);
        res.status(500).json({ error: 'Error al crear la categoría', detalle: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await getConnection();
        await client.query('DELETE FROM Categoria WHERE ID = $1', [id]);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error('Error en eliminarCategoria:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría', detalle: error.message });
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { Seccion } = req.body;
        const client = await getConnection();
        await client.query('UPDATE Categoria SET Seccion = $1 WHERE ID = $2', [Seccion, id]);
        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        console.error('Error en editarCategoria:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría', detalle: error.message });
    }
};