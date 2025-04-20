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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const clienteId = route.params.id

const cliente = ref({
  id: '',
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  email: '',
})

// Lista de clientes simulada
const clientes = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', telefono: '123456789', direccion: 'Calle Falsa 123', email: 'juan.perez@example.com' },
  { id: '2', nombre: 'María', apellido: 'Gómez', telefono: '987654321', direccion: 'Avenida Siempre Viva 456', email: 'maria.gomez@example.com' },
  { id: '3', nombre: 'Carlos', apellido: 'López', telefono: '555555555', direccion: 'Boulevard Principal 789', email:  'carlos.perez@example.com'}
]

// Función para cargar los datos del cliente
const loadCliente = () => {
  const existingCliente = clientes.find((c) => c.id === clienteId)
  if (existingCliente) {
    cliente.value = { ...existingCliente }
  } else {
    alert('Cliente no encontrado')
  }
}

// Función para enviar los datos del cliente editado
const submitCliente = () => {
  console.log('Cliente Editado:', cliente.value)
  alert('Cliente editado con éxito')
  // Aquí puedes agregar la lógica para enviar los datos al backend
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