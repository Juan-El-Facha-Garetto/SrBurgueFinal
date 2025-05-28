<template>
  <div class="register-usuario">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" v-model="form.Usuario" required />
      </div>
      <div>
        <label for="claveingreso">Clave de Ingreso:</label>
        <input type="password" id="claveingreso" v-model="form.ClaveIngreso" required />
      </div>
      <button type="submit">Registrar Usuario</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterUsuario",
  data() {
    return {
      form: {
        ID_Persona: "",
        ID_Rol: 2,
        Usuario: "",
        ClaveIngreso: "",
      },
    };
  },
  methods: {   
    async handleSubmit() {
      try {
        // Aquí envías los datos al backend para registrar el usuario
        const response = await fetch("http://localhost:8080/api/registrar-usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });
        if (response.ok) {
          alert("Usuario registrado correctamente");
          // Limpia el formulario si quieres
        } else {
          const errorData = await response.json();
          alert("Error al registrar usuario: " + errorData.message);
        }
      } catch (error) {
        alert("Error al registrar usuario");
      }
    },
  },
};
</script>


<style scoped>





</style>
