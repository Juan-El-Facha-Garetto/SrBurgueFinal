import { mssql, getConnection } from '../conexion.js';

export const agregarPersona = async (req, res) => {
  try {
    const { Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
      .input("Nombre", mssql.VarChar, Nombre)
      .input("Apellido", mssql.VarChar, Apellido)
      .input("CodArea", mssql.Int, CodArea)
      .input("Telefono", mssql.Int, Telefono)
      .input("Calle", mssql.VarChar, Calle)
      .input("Altura", mssql.Int, Altura)
      .input("Email", mssql.VarChar, Email)
      .query(`
        INSERT INTO Persona (Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email)
      OUTPUT INSERTED.ID
        VALUES (@Nombre, @Apellido, @CodArea, @Telefono, @Calle, @Altura, @Email)
      `);
    const idPersona = result.recordset[0].ID_Persona;
    res.status(201).json({ message: "Persona registrada exitosamente", idPersona });
  } catch (error) {
    console.error("Error al registrar persona:", error);
    res.status(500).json({ message: "Error al registrar persona", error: error.message });
  }
};

export const obtenerPersonas = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT ID, Nombre, Apellido,CodArea, Telefono, Calle, Altura, Email FROM Persona');
    res.json(result.recordset);
    console.log('personas obtenidas', result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener personas", error: error.message });
  }
};