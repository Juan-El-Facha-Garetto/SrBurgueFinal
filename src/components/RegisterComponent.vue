<template>
  <div class="register-component">
    <h2>Registro de Usuario</h2>
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
        <input type="text" id="CodArea" v-model="form.CodArea" required />
      </div>
      <div>
        <label for="Telefono">Número de Teléfono:</label>
        <input type="text" id="Telefono" v-model="form.Telefono" required />
      </div>
      <div>
        <label for="calle">Calle:</label>
        <input type="text" id="Calle" v-model="form.Calle" required />
      </div>
      <div>
        <label for="Altura">Número de la Calle:</label>
        <input type="number" id="Altura" v-model="form.Altura" required />
      </div>
      <div>
        <label for="Email">Email:</label>
        <input type="email" id="Email" v-model="form.Email" required />
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
    };
  },
 methods: {
  async handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/personas/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: this.form.Nombre,
          Apellido: this.form.Apellido,
          CodArea: this.form.CodArea,
          Telefono: this.form.Telefono,
          Calle: this.form.Calle,
          Altura: this.form.Altura, 
          Email: this.form.Email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registro exitoso. ID Persona: " + data.idPersona);
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
        alert("Error al registrar: " + errorData.message);
      }
    } catch (error) {
      alert("Error al enviar los datos");
      console.error(error);
    }
  },
}
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