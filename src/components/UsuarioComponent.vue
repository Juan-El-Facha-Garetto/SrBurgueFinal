<template>
  <form @submit.prevent="registrarUsuario">
    <input v-model="form.Usuario" placeholder="Usuario" required />
    <input v-model="form.ClaveIngreso" type="password" placeholder="Clave" required />
    <button type="submit">Registrar Usuario</button>
  </form>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const form = ref({
  ID_Persona: route.query.idPersona, 
    ID_Rol: 2,      
  Usuario: '',
  ClaveIngreso: ''
})

const registrarUsuario = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (response.ok) {
      alert('Usuario creado correctamente')
      router.push({name: 'login'}) // Redirigir al login después del registro
    } else {
      const error = await response.json()
      alert('Error: ' + error.message)
    }
  } catch (e) {
    alert('Error de conexión')
  }
}
</script>

<style scoped>
form {
  max-width: 350px;
  margin: 40px auto;
  padding: 24px 20px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

input {
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border: 1.5px solid #007bff;
}

button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 0;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0056b3;
}
</style>