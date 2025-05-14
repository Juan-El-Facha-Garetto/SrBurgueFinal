const { poolPromise, sql } = require("./dbconfig");

const registerUser = async (personaData, usuarioData) => {
  try {
    const pool = await poolPromise;

    // Inserción en la tabla Persona
    const personaQuery = `
      INSERT INTO Persona (Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email)
      OUTPUT INSERTED.id
      VALUES (@nombre, @apellido, @codigoArea, @telefono, @calle, @altura, @email)
    `;

    const personaResult = await pool.request()
      .input("nombre", sql.VarChar, personaData.Nombre)
      .input("apellido", sql.VarChar, personaData.Apellido)
      .input("codigoArea", sql.Int, personaData.CodArea)
      .input("telefono", sql.Int, personaData.Telefono)
      .input("calle", sql.VarChar, personaData.Calle)
      .input("altura", sql.Int, personaData.Altura)
      .input("email", sql.VarChar, personaData.Email)
      .query(personaQuery);

    const idPersona = personaResult.recordset[0].id;

    // Consulta para obtener el ID del rol desde la base de datos
    const rolQuery = `
      SELECT id 
      FROM Rol 
      WHERE nombre = @nombreRol
    `;

    const rolResult = await pool.request()
      .input("nombreRol", sql.VarChar, "Usuario") // Cambia "Usuario" por el rol que necesitas (por ejemplo, "Administrador")
      .query(rolQuery);

    const idRol = rolResult.recordset[0]?.id;

    if (!idRol) {
      throw new Error("Rol no encontrado en la base de datos");
    }

    // Inserción en la tabla Usuario
    const usuarioQuery = `
      INSERT INTO Usuario (ID_Persona, ID_Rol, Usuario, ClaveIngreso)
      VALUES (@idPersona, @idRol, @username, @password)
    `;

    await pool.request()
      .input("idPersona", sql.Int, idPersona)
      .input("idRol", sql.Int, idRol)
      .input("username", sql.VarChar, usuarioData.Usuario)
      .input("password", sql.VarChar, usuarioData.ClaveIngreso)
      .query(usuarioQuery);

    return { message: "Usuario registrado exitosamente" };
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
};