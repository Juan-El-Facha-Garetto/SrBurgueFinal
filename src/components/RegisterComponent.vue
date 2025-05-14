<template>
  <div class="register-component">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.Nombre" required />
      </div>
      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="form.Apellido" required />
      </div>
      <div>
        <label for="codigoArea">Código de Área:</label>
        <input type="number" id="codigoArea" v-model="form.CodArea" required min="1" max="99999" />
      </div>
      <div>
        <label for="telefono">Número de Teléfono:</label>
        <input type="number" id="telefono" v-model="form.Telefono" required  />
      </div>
      <div>
        <label for="calle">Calle:</label>
        <input type="text" id="calle" v-model="form.Calle" required />
      </div>
      <div>
        <label for="altura">Altura:</label>
        <input type="number" id="numeroCalle" v-model="form.Altura" required min="1" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.Email" required />
      </div>
      <div>
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" v-model="form.Usuario" required />
      </div>
      <div>
        <label for="claveIngreso">Clave de Ingreso:</label>
        <input type="password" id="claveIngreso" v-model="form.ClaveIngreso" required />
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
        Usuario: "",
        ClaveIngreso: "",
      },
    };
  },
  methods: {
  async handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
      },
        body: JSON.stringify(this.form),
      });

      if (response.ok) {
        alert("Registro exitoso");
        this.form = {
          Nombre: "",
          Apellido: "",
          CodArea: "",
          Telefono: "",
          Calle: "",
          Altura: "",
          Email: "",
          Usuario: "",
          ClaveIngreso: "",
        };
      } else {
        const errorData = await response.json();
        alert(`Error al registrar: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al registrar el usuario");
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