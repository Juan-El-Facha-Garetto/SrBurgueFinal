import { getConnection } from '../conexion.js';
import { generarToken } from '../utils/jwt.js';

export const agregarUsuario = async (req, res) => {
  try {
    const { ID_Rol, Usuario, ClaveIngreso } = req.body;
    const client = await getConnection();
    await client.query(
      `INSERT INTO Usuario (ID_Rol, Usuario, ClaveIngreso)
       VALUES ($1, $2, $3)`,
      [ID_Rol, Usuario, ClaveIngreso]
    );
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { Usuario, ClaveIngreso } = req.body;
    const client = await getConnection();

    // Buscar por nombre de usuario
    const result = await client.query(
      'SELECT * FROM Usuario WHERE Usuario = $1',
      [Usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'El usuario no existe. Por favor regístrese.' });
    }

    const user = result.rows[0];

    if (user.claveingreso !== ClaveIngreso) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

     const rol = user.id_rol === 1 ? 'admin' : 'usuario';

    // Genera el token
    const token = generarToken({
      ID: user.id,
      rol,
      Usuario: user.usuario
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