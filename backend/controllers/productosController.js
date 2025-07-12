import { getConnection } from '../conexion.js';

export const getProductos = async (req, res) => {
    const client = await getConnection();
    try {
        const result = await client.query(`
            SELECT 
                P.id, 
                P.id_categoria, 
                P.nombre, 
                P.descripcion, 
                P.precio, 
                P.foto,
                C.seccion AS categoriaseccion
            FROM producto P
            LEFT JOIN categoria C ON P.id_categoria = C.id
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
    finally{
        client.release();
    }
};

export const createProducto = async (req, res) => {
    const client = await getConnection();
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const { id_categoria, nombre, descripcion, precio } = req.body;
        // Si el campo foto viene como string (por ejemplo, desde Postman), úsalo. Si viene como archivo, usa el filename
        let foto = null;
        if (req.file) {
            foto = req.file.filename;
        } else if (req.body.foto) {
            foto = req.body.foto;
        }

        await client.query(
            `INSERT INTO producto (id_categoria, nombre, descripcion, precio, foto)
             VALUES ($1, $2, $3, $4, $5)`,
            [id_categoria, nombre, descripcion, precio, foto]
        );

        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        console.error('Error en createProducto:', error);
        res.status(500).json({ error: 'Error al crear producto', detalle: error.message });
    }
     finally{
        client.release();
    }
};

export const getProductoById = async (req, res) => {
    const client = await getConnection();
    try {
        const { id } = req.params;
        const result = await client.query(
            `SELECT 
                P.id, 
                P.id_categoria, 
                P.nombre, 
                P.descripcion, 
                P.precio, 
                P.foto,
                C.seccion AS categoriaseccion
            FROM producto P
            LEFT JOIN categoria C ON P.id_categoria = C.id
            WHERE P.id = $1`,
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
    finally{
        client.release();
    }
};

export const deleteProducto = async (req, res) => {
     const client = await getConnection();
    try {
        const { id } = req.params;
        console.log('Intentando eliminar producto con ID:', id);
        const result = await client.query('DELETE FROM producto WHERE id = $1', [id]);
        console.log('Filas afectadas:', result.rowCount);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
    finally{
        client.release();
    }
};

export const updateProducto = async (req, res) => {
    const client = await getConnection();
    try {
        const { id } = req.params;
        const { id_categoria, nombre, descripcion, precio } = req.body;
        let foto = null;

        if (req.file) {
            foto = req.file.filename;
        } else if (req.body.foto) {
            foto = req.body.foto;
        }
        await client.query(
            'UPDATE producto SET id_categoria=$1, nombre=$2, descripcion=$3, precio=$4, foto=$5 WHERE id=$6',
            [id_categoria, nombre, descripcion, precio, foto, id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }finally{
        client.release();
    }
    
};

export const getProductosFiltrados = async (req, res) => {
const client = await getConnection();
  try {
    console.log('consulta recibida:', req.query);
    const { idCategoria } = req.query;
    
    let query = `
      SELECT 
        P.id, 
        P.id_categoria, 
        P.nombre, 
        P.descripcion, 
        P.precio, 
        P.foto,
        C.seccion AS categoriaseccion
      FROM producto P
      LEFT JOIN categoria C ON P.id_categoria = C.id
    `;
    let params = [];
    if (idCategoria) {
      query += " WHERE P.id_categoria = $1";
      params = [idCategoria];
    }
    const result = await client.query(query, params);
    console.log('Productos filtrados:', result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
  finally{
        client.release();
    }
};