import { getConnection } from '../conexion.js';
import { generarToken } from '../utils/jwt.js';

export const agregarUsuario = async (req, res) => {
  try {
    const { id_rol, usuario, claveingreso } = req.body;
    const client = await getConnection();
    await client.query(
      `INSERT INTO usuario (id_rol, usuario, claveingreso)
       VALUES ($1, $2, $3)`,
      [id_rol, usuario, claveingreso]
    );
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { usuario, claveingreso } = req.body;
    const client = await getConnection();

    // Buscar por nombre de usuario
    const result = await client.query(
      'SELECT * FROM usuario WHERE usuario = $1',
      [usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'El usuario no existe. Por favor regístrese.' });
    }

    const user = result.rows[0];

    if (user.claveingreso !== claveingreso) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const rol = user.id_rol === 1 ? 'admin' : 'usuario';

    // Genera el token
    const token = generarToken({
      id: user.id,
      rol,
      usuario: user.usuario
    });

    // Devuelve datos y token
    res.json({
      id: user.id,
      usuario: user.usuario,
      rol,
      token
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};