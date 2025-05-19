import express from 'express';
import { getConnection } from './conexion.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuración de multer para guardar imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Sirve las imágenes estáticamente
app.use('/uploads', express.static('uploads'));

// Endpoint para obtener categorías
app.get('/api/categorias', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT ID, Seccion, Detalle FROM Categoria");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});

// Endpoint para crear producto con imagen real
app.post('/api/productos', upload.single('Foto'), async (req, res) => {
    try {
        const { ID_Categoria, Nombre, Descripcion, Precio } = req.body;
        const Foto = req.file ? req.file.filename : null;
        const pool = await getConnection();
        await pool.request()
            .input('ID_Categoria', ID_Categoria)
            .input('Nombre', Nombre)
            .input('Descripcion', Descripcion)
            .input('Precio', Precio)
            .input('Foto', Foto)
            .query('INSERT INTO Producto (ID_Categoria, Nombre, Descripcion, Precio, Foto) VALUES (@ID_Categoria, @Nombre, @Descripcion, @Precio, @Foto)');
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Endpoint para obtener productos
app.get('/api/productos', async (req, res) => {
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
});

// Endpoint para obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
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
});

// Endpoint para eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
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
});

// Endpoint para editar producto
app.put('/api/productos/:id', upload.single('Foto'), async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Categoria, Nombre, Descripcion, Precio } = req.body;
        let Foto = null;

        // Si se sube una nueva foto, la guardamos, si no, dejamos la anterior
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
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});