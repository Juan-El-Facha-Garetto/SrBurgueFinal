import express from 'express';
import cors from 'cors';
import path from 'path';

import productosRoutes from './routes/productosRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import personaRoutes from './routes/personaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/personas', personaRoutes);
app.use('/all', personaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});