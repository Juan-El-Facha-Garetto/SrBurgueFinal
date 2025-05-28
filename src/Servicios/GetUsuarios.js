import { connectToDatabase, mssql } from "./ConnectionSetting";

const getUsuario = async (id) => {
   try{
      const pool = await connectToDatabase();
      const result = await pool.request()
            .input('id', mssql.Int, id)
            .query('SELECT ID, ID_Persona, ID_Rol, Usuario, ClaveIngreso FROM Usuarios WHERE id = @id');

      return result.recordset[0];

  }catch (error) {
      console.error('Error fetching usuario:', error);
      
      throw error;
  }
}