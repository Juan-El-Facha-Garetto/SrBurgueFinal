import { mssql, getConnection } from '../conexion.js';

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