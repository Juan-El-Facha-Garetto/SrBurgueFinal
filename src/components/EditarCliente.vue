<template>
  <div class="editar-cliente">
    <h2>Editar Cliente</h2>
    <form @submit.prevent="submitCliente">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="cliente.nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="cliente.apellido" required />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" v-model="cliente.telefono" required />
      </div>
      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="cliente.direccion" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="cliente.email" required />
      </div>
      <button type="submit">Guardar Cliente</button>
      <a href="/admin">Volver al menú principal</a>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authFetch } from '@/helpers/authFetch'

const route = useRoute()
const clienteId = route.params.id

const cliente = ref({
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  email: ''
})

// Función para cargar los datos del cliente
const loadCliente = async () => {
  try {
    const response = await authFetch(`http://localhost:3000/api/personas/${clienteId}`);
    if (!response.ok) throw new Error('No se pudo cargar el cliente');
    const data = await response.json();
    cliente.value = data;
  } catch (error) {
    alert('Cliente no encontrado');
    console.error(error);
  }
}

// Función para enviar los datos del cliente editado
const submitCliente = async () => {
  try {
    const response = await authFetch(`http://localhost:3000/api/personas/${clienteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente.value)
    });
    if (!response.ok) throw new Error('Error al editar cliente');
    alert('Cliente editado con éxito');
  } catch (error) {
    alert('Error al editar cliente');
    console.error(error);
  }
}

// Cargar los datos del cliente al montar el componente
onMounted(() => {
  loadCliente()
})
</script>

<style scoped>
.editar-cliente {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color);
}

a {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
}
</style>