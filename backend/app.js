import express from 'express';
import cors from 'cors';

import productosRoutes from './routes/productosRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import personaRoutes from './routes/personaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import metodosdepagoRoutes from './routes/metodosdepagoRoutes.js';
import transferenciasRoutes from './routes/transferenciasRoutes.js';



const app = express();
//CCAMBIOS HECHOS OJO
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/personas', personaRoutes);
app.use('/all', personaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/metodosdepago', metodosdepagoRoutes);
app.use('/api/transferencias', transferenciasRoutes);
// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});