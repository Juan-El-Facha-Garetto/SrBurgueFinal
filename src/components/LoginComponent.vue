<template>
  <div class="login">
    <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
        <button type="submit" class="iniciar-button">Iniciar Sesión</button>
    </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="register-link">¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
      <button @click="continueWithoutLogin" class="continue-button">Continuar sin iniciar sesión</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref(null)
const router = useRouter()

const login = async () => {
  errorMessage.value = null;
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Usuario: username.value,
        ClaveIngreso: password.value
      })
    });
    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.message;
      return;
    }

    // Redirección según el rol
    if (data.rol === 'admin') {
      router.push('/admin'); // Cambia '/admin' por la ruta de tu panel de admin
    } else if (data.rol === 'usuario') {
      router.push('/home'); // Cambia '/home' por la ruta de usuario común
    }
  } catch (error) {
    errorMessage.value = 'Error de conexión con el servidor';
  }
};

const continueWithoutLogin = () => {
  router.push('/home') // Redirigir al menú directamente
}
</script>

<style scoped>

.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
}
.iniciar-button {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--text-color);
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.login-button,
.continue-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover,
.continue-button:hover {
  background-color: var(--primary-color);
}

.error {
  color: var(--error-color);
  text-align: center;
  margin-top: 10px;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  color: var(--primary-color);
}

.register-link a {
  color: var(--secondary-color);
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>