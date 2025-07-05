import { getConnection } from '../conexion.js';

export const getProductos = async (req, res) => {
    try {
        const client = await getConnection();
        const result = await client.query(`
            SELECT 
                P.ID, 
                P.ID_Categoria, 
                P.Nombre, 
                P.Descripcion, 
                P.Precio, 
                P.Foto,
                C.Seccion AS CategoriaSeccion
            FROM Producto P
            LEFT JOIN Categoria C ON P.ID_Categoria = C.ID
        `);
        res.json(result.rows);
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

        const client = await getConnection();
        console.log('Conexión establecida');

        await client.query(
            `INSERT INTO Producto (ID_Categoria, Nombre, Descripcion, Precio, Foto)
             VALUES ($1, $2, $3, $4, $5)`,
            [ID_Categoria, Nombre, Descripcion, Precio, Foto]
        );

        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        console.error('Error en createProducto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await getConnection();
        const result = await client.query(
            `SELECT 
                P.ID, 
                P.ID_Categoria, 
                P.Nombre, 
                P.Descripcion, 
                P.Precio, 
                P.Foto,
                C.Seccion AS CategoriaSeccion
            FROM Producto P
            LEFT JOIN Categoria C ON P.ID_Categoria = C.ID
            WHERE P.ID = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Intentando eliminar producto con ID:', id);
        const client = await getConnection();
        const result = await client.query('DELETE FROM Producto WHERE ID = $1', [id]);
        console.log('Filas afectadas:', result.rowCount);
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

        const client = await getConnection();
        await client.query(
            'UPDATE Producto SET ID_Categoria=$1, Nombre=$2, Descripcion=$3, Precio=$4, Foto=$5 WHERE ID=$6',
            [ID_Categoria, Nombre, Descripcion, Precio, Foto, id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

export const getProductosFiltrados = async (req, res) => {
  try {
    console.log('consulta recibida:', req.query);
    const { idCategoria } = req.query;
    const client = await getConnection();
    let query = `
      SELECT 
        P.ID, 
        P.ID_Categoria, 
        P.Nombre, 
        P.Descripcion, 
        P.Precio, 
        P.Foto,
        C.Seccion AS CategoriaSeccion
      FROM Producto P
      LEFT JOIN Categoria C ON P.ID_Categoria = C.ID
    `;
    let params = [];
    if (idCategoria) {
      query += " WHERE P.ID_Categoria = $1";
      params = [idCategoria];
    }
    const result = await client.query(query, params);
    console.log('Productos filtrados:', result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};