const {mssql, connectToDatabase } = require("./ConnectionSetting");

async function agregarPersona(Persona) {
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input("Nombre", mssql.VarChar, Persona.Nombre)
      .input("Apellido", mssql.VarChar, Persona.Apellido)
      .input("CodArea", mssql.Int, Persona.CodArea)
      .input("Telefono", mssql.Int, Persona.Telefono)
      .input("Calle", mssql.VarChar, Persona.Calle)
      .input("Altura", mssql.Int, Persona.Altura)
      .input("Email", mssql.VarChar, Persona.Email)
      .query(`
        INSERT INTO Persona (Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email)
        OUTPUT INSERTED.ID_Persona
        VALUES (@Nombre, @Apellido, @CodArea, @Telefono, @Calle, @Altura, @Email)
      `);
      const idPersona = result.recordset[0].ID_Persona;
     console.log("Persona agregada correctamente con ID:", idPersona);
    return { ok: true, idPersona };
  } catch (error) {
    console.error("Error al agregar a la persona:", error);
    return { ok: false, error: error.message };

  }
}

module.exports = {agregarPersona};