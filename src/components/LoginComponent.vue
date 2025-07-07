<template>
  <div class="login">
    <h1>Iniciar Sesión (Administrador)</h1>
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
    <button class="iniciar-button" @click="irAHome">Iniciar a Home</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const API_URL = process.env.VUE_APP_API_URL;

const username = ref('')
const password = ref('')
const errorMessage = ref(null)
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  errorMessage.value = null;
  try {
    const response = await fetch(`${API_URL}/api/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: username.value,
        claveingreso: password.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.message;
      return;
    }

    if (data.rol !== 'admin') {
      errorMessage.value = 'Solo el administrador puede iniciar sesión aquí.';
      return;
    }

    userStore.login(data)
    localStorage.setItem('user', JSON.stringify(data))
    localStorage.setItem('token', data.token)

    router.push('/admin');
  } catch (error) {
    errorMessage.value = 'Error de conexión con el servidor';
  }
};

const irAHome = () => {
  router.push('/home');
};

</script>

<style scoped>

.login {
  font-family: 'Georgia', serif;
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
  color: black;
  margin-bottom: 20px;
}
.iniciar-button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-family: 'Georgia', serif;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background-color 0.6s ease;
}
.iniciar-button:hover {
  background-color: var(--secondary-color); /* Mostaza más clara al pasar el mouse */
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