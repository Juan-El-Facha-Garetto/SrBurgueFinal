const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { agregarPersona } = require("./AddPersona");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const Persona = req.body;
  const resultado = await agregarPersona(Persona);
  if (resultado.ok) {
    res.status(201).json({ 
          message: "Usuario registrado exitosamente",
        idPersona: resultado.idPersona
       });
  } else {
    res.status(500).json({ message: resultado.error || "Error al registrar usuario" });
  }
});

app.listen(8080, () => {
  console.log("Backend corriendo en http://localhost:8080");
});