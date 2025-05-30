import { getConnection } from '../conexion.js';
export const getProductos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                P.ID, 
                P.ID_Categoria, 
                P.Nombre, 
                P.Descripcion, 
                P.Precio, 
                P.Foto,
                C.Seccion AS CategoriaSeccion,
                C.Detalle AS CategoriaDetalle
            FROM Producto P
            LEFT JOIN Categoria C ON P.ID_Categoria = C.ID
        `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const createProducto = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const { ID_Categoria, Nombre, Descripcion, Precio } = req.body;
        const Foto = req.file ? req.file.filename : null;

        const pool = await getConnection();
        console.log('Conexión establecida');

        await pool.request()
            .input('ID_Categoria', ID_Categoria)
            .input('Nombre', Nombre)
            .input('Descripcion', Descripcion)
            .input('Precio', Precio)
            .input('Foto', Foto)
            .query(`
                INSERT INTO Producto (ID_Categoria, Nombre, Descripcion, Precio, Foto)
                VALUES (@ID_Categoria, @Nombre, @Descripcion, @Precio, @Foto)
            `);

        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        console.error('Error en createProducto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID', id)
            .query(`
                SELECT 
                    P.ID, 
                    P.ID_Categoria, 
                    P.Nombre, 
                    P.Descripcion, 
                    P.Precio, 
                    P.Foto,
                    C.Seccion AS CategoriaSeccion,
                    C.Detalle AS CategoriaDetalle
                FROM Producto P
                LEFT JOIN Categoria C ON P.ID_Categoria = C.ID
                WHERE P.ID = @ID
            `);
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        await pool.request()
            .input('ID', id)
            .query('DELETE FROM Producto WHERE ID = @ID');
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Categoria, Nombre, Descripcion, Precio } = req.body;
        let Foto = null;

        if (req.file) {
            Foto = req.file.filename;
        } else if (req.body.Foto) {
            Foto = req.body.Foto;
        }

        const pool = await getConnection();
        await pool.request()
            .input('ID', id)
            .input('ID_Categoria', ID_Categoria)
            .input('Nombre', Nombre)
            .input('Descripcion', Descripcion)
            .input('Precio', Precio)
            .input('Foto', Foto)
            .query('UPDATE Producto SET ID_Categoria=@ID_Categoria, Nombre=@Nombre, Descripcion=@Descripcion, Precio=@Precio, Foto=@Foto WHERE ID=@ID');
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};