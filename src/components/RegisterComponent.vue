<template>
  <div class="register-component">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="form.nombre" required />
      </div>
      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="form.apellido" required />
      </div>
      <div>
        <label for="codigoArea">Código de Área:</label>
        <input type="text" id="codigoArea" v-model="form.codigoArea" required />
      </div>
      <div>
        <label for="telefono">Número de Teléfono:</label>
        <input type="text" id="telefono" v-model="form.telefono" required />
      </div>
      <div>
        <label for="calle">Calle:</label>
        <input type="text" id="calle" v-model="form.calle" required />
      </div>
      <div>
        <label for="numeroCalle">Número de la Calle:</label>
        <input type="text" id="numeroCalle" v-model="form.numeroCalle" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
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
        nombre: "",
        apellido: "",
        codigoArea: "",
        telefono: "",
        calle: "",
        numeroCalle: "",
        email: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Datos del formulario:", this.form);
      // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
      alert("Registro exitoso");
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