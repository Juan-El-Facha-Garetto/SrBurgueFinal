const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { registerUser } = require("./RegisterConsulta");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ruta para registrar un usuario
app.post("/api/register", async (req, res) => {
  const { Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email, Usuario, ClaveIngreso, idRol } = req.body;

  try {
    const result = await registerUser(
      { Nombre, Apellido, CodArea, Telefono, Calle, Altura, Email },
      { Usuario, ClaveIngreso, idRol }
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error al registrar el usuario" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});