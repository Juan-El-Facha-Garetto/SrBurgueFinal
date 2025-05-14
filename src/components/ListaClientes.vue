<template>
  <div class="lista-clientes">
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.Nombre }}</td>
          <td>{{ cliente.Apellido }}</td>
          <td>{{ cliente.CodArea }}-{{ cliente.telefono }}</td>
          <td>{{ cliente.Calle }} {{ cliente.Altura }}</td>
          <td>{{ cliente.Email }}</td>
          <td>
            <button @click="editarCliente(cliente.id)">Editar</button>
            <button @click="eliminarCliente(cliente.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import {  useRouter } from 'vue-router'


const clientes = ref([]);
const router = useRouter()

const obtenerClientes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/personas');
    clientes.value = response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    alert('No se pudo cargar la lista de clientes.');
  }
};

  // Función para redirigir a la vista de edición
const editarCliente = (id) => {
  router.push(`/editar-cliente/${id}`)
}

// Función para eliminar un cliente
const eliminarCliente = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/personas/${id}`);
    clientes.value = clientes.value.filter((cliente) => cliente.id !== id);
    alert('Cliente eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    alert('No se pudo eliminar el cliente.');
  }
};

onMounted(() => {
  obtenerClientes();
});

</script>

<style scoped>
.lista-clientes {
  max-width: calc(100% - 40px);
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

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: var(--primary-color);
  color: var(--text-color);
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid var(--border-color);
}

tbody tr:nth-child(even) {
  background-color: var(--secondary-color);
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color);
}
</style>