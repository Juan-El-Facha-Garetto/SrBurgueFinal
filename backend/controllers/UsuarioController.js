import { mssql, getConnection } from '../conexion.js';
import { generarToken } from '../utils/jwt.js';

export const agregarUsuario = async (req, res) => {
  try {
    const { ID_Persona, ID_Rol, Usuario, ClaveIngreso } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("ID_Persona", mssql.Int, ID_Persona)
      .input("ID_Rol", mssql.Int, ID_Rol)
      .input("Usuario", mssql.VarChar, Usuario)
      .input("ClaveIngreso", mssql.VarChar, ClaveIngreso)
      .query(`
        INSERT INTO Usuario (ID_Persona, ID_Rol, Usuario, ClaveIngreso)
        VALUES (@ID_Persona, @ID_Rol, @Usuario, @ClaveIngreso)
      `);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { Usuario, ClaveIngreso } = req.body;
    const pool = await getConnection();

    // Buscar por nombre de usuario
    const result = await pool.request()
      .input('Usuario', mssql.VarChar, Usuario)
      .query('SELECT * FROM Usuario WHERE Usuario = @Usuario');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'El usuario no existe. Por favor regístrese.' });
    }

    const user = result.recordset[0];

    if (user.ClaveIngreso !== ClaveIngreso) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

     const rol = user.ID_Rol === 1 ? 'admin' : 'usuario';

    // Genera el token
    const token = generarToken({
      ID: user.ID,
      rol,
      Usuario: user.Usuario
    });

    // Devuelve datos y token
    res.json({
      id: user.ID,
      usuario: user.Usuario,
      rol,
      token
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};