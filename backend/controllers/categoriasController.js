import { getConnection } from '../conexion.js';

export const getCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT ID, Seccion FROM Categoria");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { Seccion, Detalle } = req.body;
        const pool = await getConnection();
        await pool.request()
            .input('Seccion', Seccion)
            .query('INSERT INTO Categoria (Seccion) VALUES (@Seccion)');
        res.status(201).json({ message: 'Categoría creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        await pool.request()
            .input('ID', id)
            .query('DELETE FROM Categoria WHERE ID = @ID');
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
           console.error(error); // <-- AGREGA ESTA LÍNEA
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

export const editarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { Seccion, Detalle } = req.body;
        const pool = await getConnection();
        await pool.request()
            .input('ID', id)
            .input('Seccion', Seccion)
            .query('UPDATE Categoria SET Seccion = @Seccion WHERE ID = @ID');
        res.json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};