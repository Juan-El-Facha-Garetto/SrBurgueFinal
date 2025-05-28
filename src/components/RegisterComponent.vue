<template>
  <div class="register-component">
    <h2>Registro de Persona</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="Nombre">Nombre:</label>
        <input type="text" id="Nombre" v-model="form.Nombre" required />
      </div>
      <div>
        <label for="Apellido">Apellido:</label>
        <input type="text" id="Apellido" v-model="form.Apellido" required />
      </div>
      <div>
        <label for="CodArea">Código de Área:</label>
        <input type="number" id="CodArea" v-model="form.CodArea" required min="1" max="99999" />
      </div>
      <div>
        <label for="Telefono">Número de Teléfono:</label>
        <input type="number" id="Telefono" v-model="form.Telefono" required  />
      </div>
      <div>
        <label for="Calle">Calle:</label>
        <input type="text" id="Calle" v-model="form.Calle" required />
      </div>
      <div>
        <label for="Altura">Altura:</label>
        <input type="number" id="Altura" v-model="form.Altura" required min="1" />
      </div>
      <div>
        <label for="Email">Email:</label>
        <input type="text" id="Email" v-model="form.Email" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      form: {
        Nombre: "",
        Apellido: "",
        CodArea: "",
        Telefono: "",
        Calle: "",
        Altura: "",
        Email: "",
      },
      idPersonaRegistrada: null, // Para almacenar el ID de la persona registrada
    };
  },
  methods: {
  async handleSubmit() {
    try {
      console.log("Datos a enviar:", this.form);
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
      },
        body: JSON.stringify(this.form),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registro exitoso");
        this.idPersonaRegistrada = data.id; // Asigna el ID de la persona registrada
        this.form = {
          Nombre: "",
          Apellido: "",
          CodArea: "",
          Telefono: "",
          Calle: "",
          Altura: "",
          Email: "",
        };
      } else {
        const errorData = await response.json();
        alert(`Error al registrar: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al registrar la persona");
    }
  },
},
};
</script>

<style scoped>
.register-component {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.register-component h2 {
  text-align: center;
}

.register-component form div {
  margin-bottom: 15px;
}

.register-component label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.register-component input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.register-component button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-component button:hover {
  background-color: #0056b3;
}
</style>